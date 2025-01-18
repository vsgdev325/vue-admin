<script setup lang="ts">
import { useAuthStore } from '@/store'
import Chart from './components/chart.vue'
import { $t } from '@/utils'

const { userInfo } = useAuthStore()
</script>

<template>
  <n-grid
    :x-gap="16"
    :y-gap="16"
  >
    <n-gi :span="16">
      <n-space
        vertical
        :size="16"
      >
        <n-card style="--n-padding-left: 0;">
          <Chart />
        </n-card>
        <n-card>
          <n-grid
            :x-gap="8"
            :y-gap="8"
          >
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:user" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic :label="$t('workbench.statisticLabel1')">
                      <n-number-animation show-separator :from="0" :to="12039" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:every-user" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic :label="$t('workbench.statisticLabel2')">
                      <n-number-animation show-separator :from="0" :to="44039" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:preview-open" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic :label="$t('workbench.statisticLabel3')">
                      <n-number-animation show-separator :from="0" :to="551039" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:star" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic :label="$t('workbench.statisticLabel4')">
                      <n-number-animation show-separator :from="0" :to="7739" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
          </n-grid>
        </n-card>
        <n-card :title="$t('workbench.cards.1.titleDynamic')">
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              {{ $t('common.more') }}
            </n-button>
          </template>
          <n-list hoverable>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="How can you get a car"
                title-extra="09/29/2022"
                description="It is the abbreviation of 'how can I have a car in my living room', which refers to those who want to shuttle between the lanes and treat the road as the living room."
              />
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="Five Great Divine skills of Jianjian"
                title-extra="09/29/2022"
                description="The five major magic skills on the streets, including 1. one-handed traction upward. 2. Slowly double arms. 3. People. 4. Pre-level. 5. Russian style."
              />
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="How about the seventy years of the world?"
                title-extra="09/29/2022"
                description="★ Meaning: It is used to ridicule because of the long-standing time of the Queen of the United Kingdom, which leads to the eldest son Charles to become the crown prince that has the longest time for the throne in history "
              />
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="What are you doing ~ haha ~ Oh ~"
                title-extra="09/29/2022"
                description="Cai Xukun, from the famous idol trainee, two and a half years and a half years and a half-year-old band combing, was a scene of a variety show idol trainee in 2018"
              />
            </n-list-item>
          </n-list>
        </n-card>
      </n-space>
    </n-gi>
    <n-gi :span="8">
      <n-space
        vertical
        :size="16"
      >
        <n-card :title="$t('workbench.cards.2.titleAnnouncement')">
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              {{ $t('common.more') }}
            </n-button>
          </template>
          <n-list>
            <n-list-item>
              <template #prefix>
                <n-tag
                  :bordered="false"
                  type="info"
                  size="small"
                >
                  notify
                </n-tag>
              </template>
              <n-button text>
                Drifting across the sea college
              </n-button>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-tag
                  :bordered="false"
                  type="success"
                  size="small"
                >
                  information
                </n-tag>
              </template>
              <n-button text>
                You are playing very new things
              </n-button>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-tag
                  :bordered="false"
                  type="warning"
                  size="small"
                >
                  Activity
                </n-tag>
              </template>
              <n-button text>
                Go ashore the first sword, cut the person first
              </n-button>
            </n-list-item>
          </n-list>
        </n-card>
        <n-grid
          :x-gap="8"
          :y-gap="8"
        >
          <n-gi :span="12">
            <n-card>
              <n-flex vertical align="center">
                <n-text depth="3">
                  Order number
                </n-text>
                <n-icon-wrapper :size="46" :border-radius="999">
                  <nova-icon :size="26" icon="icon-park-outline:all-application" />
                </n-icon-wrapper>
                <n-text strong class="text-2xl">
                  1,234,123
                </n-text>
              </n-flex>
            </n-card>
          </n-gi>
          <n-gi :span="12">
            <n-card>
              <n-flex vertical align="center">
                <n-text depth="3">
                  To do
                </n-text>
                <n-el>
                  <n-icon-wrapper :size="46" color="var(--warning-color)" :border-radius="999">
                    <nova-icon :size="26" icon="icon-park-outline:list-bottom" />
                  </n-icon-wrapper>
                </n-el>
                <n-text strong class="text-2xl">
                  78
                </n-text>
              </n-flex>
            </n-card>
          </n-gi>
        </n-grid>
        <n-card title="Task progress">
          <n-timeline>
            <n-timeline-item content="啊" />
            <n-timeline-item
              type="success"
              title="success"
              content="Where to succeed"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="error"
              content="Where is wrong"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="warning"
              title="warn"
              content="Where to warn"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="info"
              title="information"
              content="The information"
              time="2018-04-03 20:46"
              line-type="dashed"
            />
            <n-timeline-item content="ah" />
          </n-timeline>
        </n-card>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<style scoped></style>
