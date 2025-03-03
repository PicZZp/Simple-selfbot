const connect = require("./connect");
const lintod = connect.lintod
const { getBuffer } = require("./help.js");
const {
  MessageType,
  Mimetype
} = require("@adiwajshing/baileys");
const axios = require("axios");

const downloadig = async(link, from, lin, prefix) => {
  try {
  var a = await axios.get(`https://mccnlight-api.herokuapp.com/api/igdl?url=${link}`)
  var b = a.data.result
  var owner = a.data.owner
  var capt = a.data.caption
  b.forEach(async(res) => {
      if(res.type == 'jpg'){
        var c = await getBuffer(res.url)
        lintod.sendMessage(from, c, MessageType.image, {quoted: lin, caption: `Instagram Downloader\n\nOwner : ${owner}\n\nCaption : ${capt}\n\nType : ${res.type}`})
      } else {
        var d = await getBuffer(res.url)
        lintod.sendMessage(from, d, MessageType.video, {quoted: lin, caption: `Instagram Downloader\n\nOwner : ${owner}\n\nCaption : ${capt}\n\nType : ${res.type}` })
      }
    })
  } catch (e) {
    console.log(e)
    lintod.sendMessage(from, 'error, mungkin link tidak valid', MessageType.text)
  }
}

const igstory = async(username, from, lin, prefix) => {
  try {
    var a = await axios.get(`https://mccnlight-api.herokuapp.com/api/igstori?username=${username}`)
    var username = a.data.username
    var count = a.data.stories_count
    var b = a.data.data
    b.forEach(async(res) => {
      if(res.type == 'jpg'){
        var c = await getBuffer(res.url)
        lintod.sendMessage(from, c, MessageType.image)
      } else {
        var d = await getBuffer(res.url)
        lintod.sendMessage(from, d, MessageType.video)
      }
    })
  } catch (e) {
    console.log(e)
    lintod.sendMessage(from, 'error, mungkin link tidak valid', MessageType.text)
  }
}

module.exports = { downloadig, igstory }