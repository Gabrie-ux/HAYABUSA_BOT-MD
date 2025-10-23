import fs from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    if (m.isGroup && !db.data.chats[m.chat].economy) {
      return m.reply(`🚫 Los comandos de *Economía* están desactivados en este grupo.

🧩 Un *administrador* puede activarlos con:
» *${usedPrefix}economy on*`)
    }

    let mentionedJid = m.mentionedJid && m.mentionedJid[0]
    let who = mentionedJid ? mentionedJid : m.quoted ? m.quoted.sender : m.sender

    if (!(who in global.db.data.users)) {
      return m.reply(`El usuario no se encuentra en mi base de datos.`)
    }

    let user = global.db.data.users[who]
    let name = user.name || (await conn.getName(who).catch(() => who.split('@')[0]))
    let coin = user.coin || 0
    let bank = user.bank || 0
    let total = coin + bank

    const texto = `
╭━━━〔 💎 𝐁𝐀𝐋𝐀𝐍𝐂𝐄 💎 〕━━⬣
┃ 🧸 Usuario » *${name}*
┃
┃ 💵 Cartera » *¥${coin.toLocaleString()} ${currency}*
┃ 🏦 Banco » *¥${bank.toLocaleString()} ${currency}*
┃ 💰 Total » *¥${total.toLocaleString()} ${currency}*
╰━━━━━━━━━━━━━━━⬣

> 🪙 *Consejo:* Deposita tu dinero con » *${usedPrefix}deposit*
`

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/2vwn2d.jpg' },
      caption: texto,
      mentions: [who]
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.reply(`⚠️ Ocurrió un error al mostrar el balance.`)
  }
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank']
handler.group = true

export default handler