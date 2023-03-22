const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");
var express = require("express");
var router = express.Router();

function returnError(res, error) {
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }

router.get("/", (req, res, next) => {
    Contact.find()
      .populate("group")
      .then((contacts) => {
        res.status(200).json({
          message: " Contacts fetched successfully.",
          contacts: contacts,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server problem to collect contact information.",
          error: err,
        });
      });
  });
  
  router.post("/", (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");
  
    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group,
    });
    if (contact.group && contact.group.length > 0) {
        for (let groupContact of contact.group) {
          groupContact = groupContact._id;
        }
      }
    contact
      .save()
      .then((createdContact) => {
        res.status(201).json({
          message: "Contact created",
          contact: createdContact,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server problem to create a contact.",
          error: err,
        });
      });
  });
  
  router.put("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then((contact) => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;
  
        Contact.updateOne({ id: req.params.id }, contact)
          .then((result) => {
            res.status(204).json({
              message: "Contact updated",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Problem with the sever to update contact.",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Record not found.",
          error: err,
        });
      });
  });
  
  router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then((contact) => {
        Contact.deleteOne({ id: req.params.id })
          .then((result) => {
            res.status(204).json({
              message: "CoCntact Delete",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Server Error to Delete Contact.",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Not found.",
          error: err,
        });
      });
  });
  
module.exports = router;