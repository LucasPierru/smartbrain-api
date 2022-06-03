const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const handleApiCall = async(req, res) => {
    const raw = JSON.stringify({
        user_app_id : {
        user_id: "luysru7_3635",
        app_id: "smart-brain"
        },
        inputs: [
            {
                data: {
                    image: {
                        url: req.body.input
                    },
                },
            },
        ],
    });
    try {
        const response = await fetch(
            "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Key c2bb7b98f077494fb99f52b902385a51",
                },
                body: raw,
            }
            )
        const data = await response.json();
        res.json(data)
    } catch(error) {
        console.log(error)
        res.status(400).json('Unable to work with API')
    }
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}