const { Document } = require('./models/documents')
const { Revision } = require('./models/revisions')

exports.index = async function (req,res,next) {
    Document.find()
    .then((documents) => res.send(documents))
}

exports.revisions = async function (req,res,next){
    Revision.findOne({title: req.params.title})
    .then((revisionList) => res.send(revisionList))
}

exports.create = async function (req,res,next) {
    
    Document.findOne({title: req.params.title})
    .then( async ( result ) => {
        if (!result) {
            const document = new Document({
                title: req.params.title,
                content: req.body.content
            })
            const revision = new Revision({
                title: req.params.title
            })        
                   
            document.save()            
            revision.save() 
            .then( () => res.send({ message: "Document saved successfully"}))      
        } else {
            const document = new Document({
                title: req.params.title,
                content: req.body.content
            })
            try {                
                let newDocument = await document.save()                
                const revObj = { 'docID': newDocument._id, 'timestamp': newDocument.timestamp }                
                Revision.findOneAndUpdate(
                    {title: newDocument.title},
                    { $push: { 'revisions': revObj }},
                    {safe: true, upsert: true}                    
                )               
            }
            catch(err) {
                console.log(err)
            }
            finally {
                res.send({message: "document saved"})
            }
            
            

            
            

        }

    })

    


    
    
}


