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
    /* Revision.find({title: req.params.title})
    .then((revisionList) => {
        if (!revisionList) {
            res.status(404).send({message: "No Document Found with that Title"})
        } else {
            res.send(revisionList)
        }
        
    }) */

    const document = await Document.findOne({title: req.params.title})
    const revisionIDs = document.revisions
    const revisions = []
    for (let i = 0; i < revisionIDs.length; i++) {
        const revision = await Revision.findOne({_id: revisionIDs[i]})
        revisions.push(revision)
    }
    res.send(revisions)

}

exports.create = async function (req,res,next) {
    const revision = new Revision({
        content: req.body.content
        })
        const savedRev = await revision.save()        
        
    const existingDoc = await Document.findOne({title: req.params.title})

    console.log("Existing Doc",existingDoc)

    let document;

    if (existingDoc === null) {
        document = new Document({
            title: req.params.title,
            revisions: []               
        })        
    } else {
        document = existingDoc
    }
    document.revisions.push(savedRev)
    document.save()
    res.status(201).send(document)

    
    
    /* Document.findOne({title: req.params.title})
    .then( async ( result ) => {

            

            
            
                 
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

    ) */

    


    
    
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
    /* let IDList = []
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
    } */

    const titleList = await Document.find().select('title')
    const mappedList = titleList.map(x => x.title)
    res.send(mappedList)
    


    
     

}