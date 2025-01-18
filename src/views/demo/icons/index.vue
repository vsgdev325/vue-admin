<template>
  <n-space vertical>
    <n-card title="Icon selector">
      <icon-select />
    </n-card>
    <n-card title="Automatic import icon">
      <div>
        normal：<icon-park-outline-apple />
      </div>
      <div>
        big：<icon-park-outline-apple class="text-2em" />
      </div>
      <div>
        Big size：<icon-park-outline-apple class="text-4em" />
      </div>
    </n-card>
    <n-card title="Automatically import SVG icon">
      <div>
        normal：<svg-icons-cool />
      </div>
      <div>
        big：<svg-icons-cool class="text-2em" />
      </div>
      <div>
        Big size：<svg-icons-cool class="text-4em" />
      </div>
      <div>
        nova-icon Component load：<nova-icon icon="local:cool" />
      </div>
    </n-card>
  </n-space>
</template>
