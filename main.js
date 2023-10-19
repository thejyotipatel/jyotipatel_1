import { createClient } from 'contentful'

const projectContainer = document.getElementById('work-cards')

let projects = []

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master',
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
})

const displayProjectCards = () => {
  projects.map((item) => {
    const element1 = document.createElement('div')
    element1.className = 'card'

    const element2 = document.createElement('a')
    element2.href = item.url
    element2.target = '_blank'

    const element3 = document.createElement('img')
    element3.alt = item.title
    element3.src = item.img
    element3.loading = 'lazy'

    element1.appendChild(element2)
    element2.appendChild(element3)
    projectContainer.appendChild(element1)
    return projectContainer
  })
}

const featchData = async () => {
  try {
    const response = await client.getEntries({ content_type: 'projects' })

    projects = response.items.map((item) => {
      const { title, url, image } = item.fields
      const id = item.sys?.id
      const img = image?.fields?.file?.url
      return { id, title, url, img }
    })
    displayProjectCards(projects)
  } catch (error) {
    console.log(error)
  }
}
featchData()
