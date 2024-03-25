import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorCanvasCardType } from './types'
import { EditorState } from '@/providers/editor-provider'
import { getDiscordConnectionUrl } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import {
  getNotionConnection,
  getNotionDatabase,
} from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import {
  getSlackConnection,
  listBotChannels,
} from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { Option } from '@/components/ui/multiple-selector'

export const onDragStart = (
  event: any,
  nodeType: EditorCanvasCardType['type']
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

export const onSlackContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}

export const onDiscordContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}

export const onContentChange = (
  nodeConnection: ConnectionProviderProps,
  nodeType: string,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (nodeType === 'Slack') {
    onSlackContent(nodeConnection, event)
  } else if (nodeType === 'Discord') {
    onDiscordContent(nodeConnection, event)
  } else if (nodeType === 'Notion') {
    onNotionContent(nodeConnection, event)
  }
}

export const onAddTemplateSlack = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }))
}

export const onAddTemplateDiscord = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }))
}

export const onAddTemplate = (
  nodeConnection: ConnectionProviderProps,
  title: string,
  template: string
) => {
  if (title === 'Slack') {
    onAddTemplateSlack(nodeConnection, template)
  } else if (title === 'Discord') {
    onAddTemplateDiscord(nodeConnection, template)
  }
}

export const onConnections = async (
  nodeConnection: ConnectionProviderProps,
  editorState: EditorState,
  googleFile: any
) => {
  if (editorState.editor.selectedNode.data.title == 'Discord') {
    const connection = await getDiscordConnectionUrl()
    if (connection) {
      nodeConnection.setDiscordNode({
        webhookURL: connection.url,
        content: '',
        webhookName: connection.name,
        guildName: connection.guildName,
      })
    }
  }
  if (editorState.editor.selectedNode.data.title == 'Notion') {
    const connection = await getNotionConnection()
    if (connection) {
      nodeConnection.setNotionNode({
        accessToken: connection.accessToken,
        databaseId: connection.databaseId,
        workspaceName: connection.workspaceName,
        content: {
          name: googleFile.name,
          kind: googleFile.kind,
          type: googleFile.mimeType,
        },
      })

      if (nodeConnection.notionNode.databaseId !== '') {
        const response = await getNotionDatabase(
          nodeConnection.notionNode.databaseId,
          nodeConnection.notionNode.accessToken
        )
      }
    }
  }
  if (editorState.editor.selectedNode.data.title == 'Slack') {
    const connection = await getSlackConnection()
    if (connection) {
      nodeConnection.setSlackNode({
        appId: connection.appId,
        authedUserId: connection.authedUserId,
        authedUserToken: connection.authedUserToken,
        slackAccessToken: connection.slackAccessToken,
        botUserId: connection.botUserId,
        teamId: connection.teamId,
        teamName: connection.teamName,
        userId: connection.userId,
        content: '',
      })
    }
  }
}

export const fetchBotSlackChannels = async (
  token: string,
  setSlackChannels: (slackChannels: Option[]) => void
) => {
  await listBotChannels(token)?.then((channels) => setSlackChannels(channels))
}

export const onNotionContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setNotionNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}
