import Layout from '@/layout'

const customRouter = {
  path: '/custom',
  component: Layout,
  redirect: '/custom/sample-form',
  name: 'Custom',
  meta: {
    title: 'Custom',
    icon: 'people',
    affix: true
  },
  children: [
    {
      path: 'sample-form',
      component: () => import('@/views/custom/sample-form'),
      name: 'SampleForm',
      meta: { title: 'Sample Form' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    },
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    }
  ]
}
export default customRouter
