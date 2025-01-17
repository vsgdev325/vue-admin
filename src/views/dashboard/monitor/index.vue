<script setup lang="ts">
import Chart from './components/chart.vue'
import Chart2 from './components/chart2.vue'
import Chart3 from './components/chart3.vue'
import { $t } from '@/utils'

const tableData = [
  {
    id: 0,
    name: 'Product Name 1',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '100',
    status: 'Completed',
  },
  {
    id: 0,
    name: 'Product Name 2',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '50',
    status: 'Trading',
  },
  {
    id: 0,
    name: 'Product Name 3',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '100',
    status: 'Completed',
  },
]
</script>

<template>
  <div>
    <n-grid
      :x-gap="16"
      :y-gap="16"
    >
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic :label="$t('monitor.card.visits')">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#de4307"
              size="42"
            >
              <icon-park-outline-chart-histogram />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>{{ $t('monitor.card.visitsTotal') }}</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic :label="$t('monitor.card.downloads')">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#ffb549"
              size="42"
            >
              <icon-park-outline-chart-graph />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>{{ $t('monitor.card.downloadsTotal') }}</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic :label="$t('monitor.card.views')">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#1687a7"
              size="42"
            >
              <icon-park-outline-average />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>{{ $t('monitor.card.viewsTotal') }}</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic :label="$t('monitor.card.registrations')">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#42218E"
              size="42"
            >
              <icon-park-outline-chart-pie />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>{{ $t('monitor.card.registrationsTotal') }}</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="24">
        <n-card content-style="padding: 0;">
          <n-tabs
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
          >
            <n-tab-pane :name="$t('monitor.charts.trafficTrends')">
              <Chart />
            </n-tab-pane>
            <n-tab-pane :name="$t('monitor.charts.visitTrends')">
              <Chart2 />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-gi>
      <n-gi :span="8">
        <n-card
          :title="$t('monitor.card.visitSource')"
          :segmented="{
            content: true,
          }"
        >
          <Chart3 />
        </n-card>
      </n-gi>
      <n-gi :span="16">
        <n-card
          :title="$t('monitor.card.transactionRecords')"
          :segmented="{
            content: true,
          }"
        >
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              {{ $t('common.more') }}
            </n-button>
          </template>
          <n-table
            :bordered="false"
            :single-line="false"
          >
            <thead>
              <tr>
                <th>{{ $t('monitor.card.tran.tab.name') }}</th>
                <th>{{ $t('monitor.card.tran.tab.startTime') }}</th>
                <th>{{ $t('monitor.card.tran.tab.endTime') }}</th>
                <th>{{ $t('monitor.card.tran.tab.progress') }}</th>
                <th>{{ $t('monitor.card.tran.tab.status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in tableData"
                :key="item.id"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.end }}</td>
                <td>{{ item.prograss }}%</td>
                <td>
                  <n-tag
                    :bordered="false"
                    type="info"
                  >
                    {{ item.status }}
                  </n-tag>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped></style>
