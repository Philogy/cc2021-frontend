// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'

async function testHandler({ body }) {
  await mongoose.connect(
    process.env.DB_ACCESS_URL.replace('<password>', process.env.DB_ACCESS_PASSWORD)
  )

  const testerSchema = new mongoose.Schema({ name: String })
  const Tester = mongoose.model('Tester', testerSchema)
  const tester = new Tester({ name: body.name })
  await tester.save()

  return { message: `saved ${body.name}` }
}

export default function helloAPI(req, apiRes) {
  testHandler(req)
    .then((handlerRes) => {
      console.log('handlerRes: ', handlerRes)
      apiRes.status(200).json(handlerRes)
    })
    .catch((err) => {
      console.log('err: ', err)
      apiRes.status(500).json(err)
    })
}
