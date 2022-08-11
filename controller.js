const { Document } = require('./models/documents')
const { Revision } = require('./models/revisions')
const { ObjectId } = require('mongodb')

exports.index = async function (req,res,next) {
    Document.find()
    .then((documents) => {
        if (!documents) {
            res.status(404).send({message: "No Documents Found in the Wiki"})
        } else {
            res.send(documents)
        }
        
    })
} // list of all revisions of all documents - unused

exports.revisions = async function (req,res,next){
    Revision.findOne({title: req.params.title})
    .then((revisionList) => {
        if (!revisionList) {
            res.status(404).send({message: "No Document Found with that Title"})
        } else {
            res.send(revisionList)
        }
        
    })
}

exports.create = async function (req,res,next) {rs
    
    Document.findOne({title: req.params.title})
    .then( async ( result ) => {        
            const document = new Document({
                title: req.params.title,
                content: req.body.content
            })

            if (!result) {
                const revision = new Revision({
                    title: req.params.title
                })
                revision.save() 
            }
                 
            try {
                let newDocument = await document.save()                
                const revObj = { 'docID': newDocument._id, 'timestamp': newDocument.timestamp }                
                Revision.findOneAndUpdate(
                    {title: newDocument.title},
                    { $push: { 'revisions': revObj }},
                    {safe: true, upsert: true},
                    function (err, model) {
                        console.log(err)
                    }                   
                )       
            }
            catch (err) {
                console.log(err)
                res.send(err).status(401)
            }                           
            if (!result) {
                res.send({message: "New Document Saved Successfully!"})
            } else {
                res.send({message: "Document Updated Successfully!"})
            }          
                 
                  
        }

    )

    


    
    
}

exports.deleteAll =  async function (req,res,next){
    if (req.params.confirm !== "yes") {
        return res.send({message: `Are you sure you want to delete? Replace ${req.params.confirm} with yes`})
    }
    await Document.deleteMany()
    res.send({message: 'All Events Deleted.'})
} // for use in development only

exports.byTimeStamp = async function (req,res,next){
    if (req.params.timestamp == "latest") {
        let revList = await Revision.findOne({title: req.params.title})
        let latestRev = revList.revisions[revList.revisions.length - 1]
        console.log(latestRev)
        Document.findOne({_id: latestRev.docID, timestamp: latestRev.timestamp})
        .then( (document) => res.send(document))        
    } else {
        Document.findOne({title: req.params.title, timestamp: req.params.timestamp})
        .then( (document) => {
            if (!document) {
                res.status(404).send({message: "No Document Found. Check the Timestamp is correct."})
            } else {
                res.send(document)
            }
            
        }
        
        )   
        
    }  

}

exports.titles = async function (req,res,next) {
    let IDList = []
    let revList = await Revision.find()    
    for (let i = 0; i < revList.length; i++) {
        let latestRev = revList[i].revisions[revList[i].revisions.length - 1]       
        let latestRevDoc = await Document.findOne({_id: latestRev.docID})
        IDList.push(latestRevDoc)
    }
    if(IDList.length !== 0) {
        res.send(IDList)
    } else {
        res.status(404).send({message: "No Documents Found, the wiki may be empty"})
    }
    
     

}