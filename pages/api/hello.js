// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  try {
    switch (req.method) {
      case 'GET' :
        const response = await fetch('https://hackaton6.herokuapp.com/journal')
          .then(res => res.json())
          .then(json => {
            console.log(json)
            res.status(200).json(json)
          })
      case 'POST' :
        const postNotes = await fetch('https://hackaton6.herokuapp.com/journal', {
          method: 'POST',
          body: JSON.stringify({
            date: req.body.date,
            note: req.body.note
          })
        })
        // console.log(postNotes)
    }
  } catch (err) {
    console.log(err, "<<<<ERROR")
    res.status(500).json({error: "internal server error"})
  }
}
