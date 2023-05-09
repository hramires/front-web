<script>
import { BCollapse } from 'bootstrap-vue';

export default {
  components: {
    BCollapse,
  },
  props: {
    filters: Array,
  },
  data() {
    return {
      showMenu: false,
      activeFilter: null,
      selectedFilters: {},
    };
  },
  methods: {
    toggleFilter(filterNumber) {
      this.activeFilter = this.activeFilter === filterNumber ? null : filterNumber;
    },
    updateSelectedFilters() {
      this.$emit('update:selectedFilters', this.selectedFilters);
    },
    countSelected(filterName) {
      return this.selectedFilters[filterName] ? this.selectedFilters[filterName].length : 0;
    },
  },
};
</script>

<template>
  <div class="floating-menu-container">
    <b-button @click="showMenu = !showMenu" class="float-button">
      <b-icon icon="funnel-fill" style="color:#FFF" aria-hidden="true"></b-icon>
    </b-button>
    <transition name="slide">
      <div v-if="showMenu" class="menu-container">
        <b-list-group-item
          v-for="(filter, index) in filters"
          :key="index"
          @click="toggleFilter(index)"
          class="filter-divider"
        >
          <b-form-checkbox-group v-model="selectedFilters[filter.name]" stacked>
            <template v-slot:prepend>
              <b-icon
                :icon="activeFilter === index ? 'chevron-down' : 'chevron-right'"
              >
              </b-icon>
            </template>
            {{ filter.name }}
            <span v-if="countSelected(filter.name)" class="filter-count">
              {{ countSelected(filter.name) }}
            </span>
            <b-collapse :visible="activeFilter === index" class="filter-options">
              <b-form-checkbox
                v-for="value in filter.values"
                :key="value"
                :value="value"
                @change="updateSelectedFilters"
              >{{ value }}</b-form-checkbox>
            </b-collapse>
          </b-form-checkbox-group>
        </b-list-group-item>
      </div>
    </transition>
  </div>
</template>

<style>
.floating-menu-container {
  position: relative;
  right: -55px;
}

.float-button {
  position: absolute;
  top: -13px;
  right: -13px;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  z-index: 1000;
}

.menu-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  z-index: 999;
  /*overflow-y: auto;*/
  background-color: #fff;
  max-height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(2%);
}

.filter-options {
  padding-left: 1.5rem;
}

.filter-divider {
  border-bottom: 1px solid #dee2e6;
}

.filter-count {
  display: inline-block;
  background-color: #9dcc9a;
  border-radius: 50%;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.25rem 0.7rem;
  margin-left: 0.5rem;
}

</style>
