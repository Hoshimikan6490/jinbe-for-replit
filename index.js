// Discord bot implements
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const prefix = "mc!"
const util = require('util')
const wait = util.promisify(setTimeout);

// botが準備できれば発動され、 上から順に処理される。
client.on("ready", () => {
  // コンソールにReady!!と表示
  console.log("Ready!!");

  // ステータスを設定する
  setInterval(() => {
    client.user.setActivity({
      name: `所属サーバー数は、${client.guilds.cache.size}サーバー｜　Ping値は、${client.ws.ping}msです`
    })
  }, 10000)
  client.channels.cache.get("913953017550745618").send("起動しました！");

  // readyイベントここまで
});

// botがメッセージを受信すると発動され、 上から順に処理される。
client.on("messageCreate", async message => {
  // プレフィクスが要らない系コマンド
  if (message.content.match(/omikuji/)||message.content.match(/jinbe/)) {
    if (message.content.match(/jinbeおはよう/)||message.content.match(/おはようjinbe/)) {
      message.channel.send("おはよう！");
    } else if (message.content.match(/jinbeこんにちは/)||message.content.match(/こんにちはjinbe/)) {
      message.channel.send("こんにちわああああ！");
    } else if (message.content.match(/jinbeこんばんは/)||message.content.match(/こんばんはjinbe/)) {
      message.channel.send("こんばんわ！！");
    } else if (message.content.match(/jinbeおやすみ/)||message.content.match(/おやすみjinbe/)) {
      message.channel.send("おやすみ～\nいい夢見てね…");
    } else if (message.content === "omikuji" || message.content === "jinbe" || message.content === "omikujinbe") {
      const tic1 = new Discord.MessageButton()
        .setCustomId("omi1")
        .setStyle("PRIMARY")
        .setLabel("１を引く");
      const tic2 = new Discord.MessageButton()
        .setCustomId("omi2")
        .setStyle("SUCCESS")
        .setLabel("2を引く");
      const tic3 = new Discord.MessageButton()
        .setCustomId("omi3")
        .setStyle("DANGER")
        .setLabel("3を引く");
      const replay = await message.channel.send({
        embeds: [
          {
            title: "↓直感で押して！↓",
            color: 0xFF0000,
            thumbnail: {
              url: "https://3.bp.blogspot.com/-cPqdLavQBXA/UZNyKhdm8RI/AAAAAAAASiM/NQy6g-muUK0/s400/syougatsu2_omijikuji2.png"
            }
          }
        ],
        components: [new Discord.MessageActionRow().addComponents(tic1, tic2, tic3)]
      });

      await wait(6000)
      replay.delete()
    }
  }


  // プレフィクスが必要系コマンド
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'about') {
    const tic4 = new Discord.MessageButton()
      .setStyle("LINK")
      .setLabel("BOTを招待する")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=946587263691788399&permissions=274878000128&scope=bot");
    message.channel.send({
      embeds: [{
        title: "このBOTについて",
        description: "作成：Hoshimikan6490",
        color: 3823616,
        timestamp: new Date(),
        thumbnail: {
          url: 'attachment://file.png'
        }
      }
      ],
      files: [{ attachment: "photos/jinbe_yoshi.png", name: "file.png" }
      ],
      components: [new Discord.MessageActionRow().addComponents(tic4)]
    });
  } else if (command === 'ping') {
    message.channel.send({
      embeds: [
        {
          title: '🏓Ping!!',
          description: `Pingは ${Date.now() - message.createdTimestamp}msです。\n APIのPingは ${Math.round(client.ws.ping)}msです。`,
          color: 15132165,
          timestamp: new Date()
        }
      ]
    });
  } else if (command === 'help') {
    message.channel.send({
      embeds: [
        {
          title: "HELP",
          description: "`omikuji`：おみくじを引きます。\n　`mc!help_omikuji`で、もっと詳しい内容を表示できます。\n\n`mc!aisatu_list`:挨拶のリストを表示します。\n\n`mc!help`：このメッセージを表示します。\n\n`mc!about`：このBOTについて書かれています。\n\n`mc!ping`：このBOTのPing値を知ることが出来ます。\n　※このBOTのプロフィール欄にも書かれています。\n  （定期更新）\n\n`mc!code`：このBOTのプログラムを全公開！(笑)",
          color: 0x227fff,
          timestamp: new Date(),
          thumbnail: {
            url: 'attachment://file.png'
          }
        }
      ],
      files: [{ attachment: "photos/jinbe_yoshi.png", name: "file.png" }
      ],
    })
  } else if (command === "aisatu_list") {
    message.channel.send({
      embeds: [
        {
          title: "挨拶一覧",
          description: "・`jinbeおはよう`\n・`おはようjinbe`\n・`jinbeこんにちは`\n・`こんにちはjinbe`\n・`jinbeこんばんは`\n・`こんばんはjinbe`\n・`jinbeおやすみ`\n・`おやすみjinbe`",
          color: 0x00FF00,
          timestamp: new Date()
        }
      ]
    })
  } else if (command === "help_omikuji") {
    message.channel.send({
      embeds: [
        {
          title: "omikujiコマンドの使い方",
          description: "①「omikuji」と送信する\n\n②３つのボタンから、好きなものを選んで、押す。\n（数秒後にこのメッセージは消えます）\n\n③結果が表示される。",
          color: 0x00FF00,
          timestamp: new Date()
        }
      ]
    })
  } else if (command === "code") {
    message.channel.send({
      embeds: [
        {
          title: "このBOTのプログラム",
          description: "転用可",
          color: 0x227fff
        }
      ],
      files: ['index.js']
    });
  } else {
    message.channel.send({
      embeds: [
        {
          title: "エラー",
          description: "申し訳ございません。そのコマンドは見つかりませんでした。\n`mc!help`を実行して、コマンドを確認してください。",
          color: 0xFF0000,
          timestamp: new Date()
        }
      ]
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "omi1" || interaction.customId === "omi2" || interaction.customId === "omi3") {
    const arr = ['大吉', '中吉', '小吉', '吉', '凶', '大凶', 'じんべえ吉', 'じんべえ凶'];
    const random = Math.floor(Math.random() * arr.length);
    const result = arr[random];
    
    if (random === 4 || random === 7) {
      var file_pas = "photos/jinbe_pien.png";
    } else if (random === 5) {
      var file_pas = "photos/jinbe_pien2.png";
    } else {
      var file_pas = "photos/jinbe.png";
    }

    if (interaction.customId === "omi1") {
      var number = "1";
    } else if (interaction.customId === "omi2") {
      var number = "2";
    } else {
      var number = "3";
    }
    
    await interaction.channel.send({
      embeds: [
        {
          title: 'おみくじの結果！',
          description: 'あなたは、' + result + 'を引きました！\n\n||`ここだけの話、`<@' + interaction.user.id + '> `さんは、' + number+ 'を押したらしいよ...`||',
          color: 4817413,
          thumbnail: {
            url: 'attachment://omi_kekka.png'
          }
        }
      ],
      files: [{ attachment: file_pas, name: "omi_kekka.png" }
      ],
    });
  }
});


// botログイン
const token = process.env['TOKEN']
client.login(token);
