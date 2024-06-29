import type { App } from 'vue'
import focusDirective from './focusDirective'

export default function registerDirectives(app: App) {
  app.directive('focus', focusDirective)
}