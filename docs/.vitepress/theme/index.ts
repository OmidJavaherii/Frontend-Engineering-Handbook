import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import TopicMeta from './components/TopicMeta.vue'
import Prerequisites from './components/Prerequisites.vue'
import RelatedTopics from './components/RelatedTopics.vue'
import DifficultyBadge from './components/DifficultyBadge.vue'
import LearningPathNav from './components/LearningPathNav.vue'
import './styles/custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('TopicMeta', TopicMeta)
    app.component('Prerequisites', Prerequisites)
    app.component('RelatedTopics', RelatedTopics)
    app.component('DifficultyBadge', DifficultyBadge)
    app.component('LearningPathNav', LearningPathNav)
  },
}

export default theme
