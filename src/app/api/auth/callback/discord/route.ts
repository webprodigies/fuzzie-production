import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'
import url from 'url'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (code) {
    const data = new url.URLSearchParams()
    data.append('client_id', process.env.DISCORD_CLIENT_ID!)
    data.append('client_secret', process.env.DISCORD_CLIENT_SECRET!)
    data.append('grant_type', 'authorization_code')
    data.append(
      'redirect_uri',
      'https://localhost:3000/api/auth/callback/discord'
    )
    data.append('code', code.toString())

    const output = await axios.post(
      'https://discord.com/api/oauth2/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (output.data) {
      const access = output.data.access_token
      const UserGuilds: any = await axios.get(
        `https://discord.com/api/users/@me/guilds`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      )

      const UserGuild = UserGuilds.data.filter(
        (guild: any) => guild.id == output.data.webhook.guild_id
      )

      return NextResponse.redirect(
        `https://localhost:3000/connections?webhook_id=${output.data.webhook.id}&webhook_url=${output.data.webhook.url}&webhook_name=${output.data.webhook.name}&guild_id=${output.data.webhook.guild_id}&guild_name=${UserGuild[0].name}&channel_id=${output.data.webhook.channel_id}`
      )
    }

    return NextResponse.redirect('https://localhost:3000/connections')
  }
}
