const { Document } = require('./models/documents')

exports.index = async function (req,res,next) {
    Document.find()
    .then((documents) => res.send(documents))
}

exports.create = async function (req,res,next) {
    const document = new Document({
        title: req.params.title,
        content: req.body.content
    })

    try {
        document.save()
    }
    catch (err) {
        console.log(err)
    }
    finally {
        res.send({ message: "Document Saved Successfully!"})
    }
}