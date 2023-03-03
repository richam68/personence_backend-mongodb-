const Notice = require("./../../models/socialAdmin/notice.model");

//Get All Notices by organisation id
module.exports.getAllNoticesByOrgId = function (req, res) {
  Notice.find({
    organisation_id: req.params.organisation_id,
    visible: true,
    // $and: [
    //   { organisation_id: req.params.organisation_id },
    //   { date: req.params.date },
    // ],
  })
    .sort({ createdAt: -1 })
    // .limit(10)
    .exec(function (err, Notice) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(Notice);
      }
    });
};

//Get All Notices by Date
// module.exports.getAllNoticesByDate = function (req,res)
// {
//   Notice.find({date:req.body.date}).exec(function (err,notices){
//     if(err)
//     {
//
//       res.status(500).json(err);
//     }
//     else
//     {
//
//       res.json(notices);
//     }
//   });
// };

// Module to Get Notices
module.exports.getNotices = function (req, res) {
  Notice.find()
    .sort({ createdAt: -1 })
    .exec(function (err, notices) {
      if (err) {
        console.log("Error finding notices data");
        res.status(500).json(err);
      } else {
        console.log("Found notices", notices.length);
        res.json(notices);
      }
    });
};

// Module to Insert All Notices
module.exports.insertNotices = async function (req, res) {
  const notices = req.body.notice;
  try {
    for (let notice of notices) {
      await Notice.create({
        eventHeader: notice.eventHeader,
        noticeFile: notice.noticeFile,
        noticePdf: notice.noticePdf,
        organisation_id: notice.organisation_id,
      });
    }
    res.status(201).send("Notices created successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.userNoticeUpdate = function (req, res) {
  // var noticeId = req.params.noticeId;
  Notice.findById({ _id: req.params._id })
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {
        console.log("Error finding organisation_id");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res;
        response.status = 404;
        response.message = {
          message: "notice_id not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        doc.notice = req.body.notice;
        doc.date = req.body.date;
        doc.organisation_id = req.body.organisation_id;
        doc.visible = req.body.visible;

        doc.save(function (err, NoticeUpdates) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json(NoticeUpdates);
          }
        });
      }
    });
};

module.exports.userVisibileUpdate = async function (req, res) {
  let { noticeVisibile } = req.body;
  console.log("noticeVisibile backend data", noticeVisibile);
  try {
    for (let notices of noticeVisibile) {
      await Notice.updateOne(
        { _id: notices._id },
        {
          visible: notices.visible,
        }
      );
    }
    res.status(200).json("Data updated succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
  return true;
};

module.exports.deleteNoticeLists = function (req, res) {
  var noticeId = req.params.noticeId;
  Notice.findByIdAndRemove(noticeId).exec(function (err, Notice) {
    if (err) {
      res.status(404).json(err);
    } else {
      console.log("notice list deleted id", noticeId);
      res.status(204).json();
    }
  });
};
