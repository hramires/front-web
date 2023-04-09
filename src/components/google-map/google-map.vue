<script>
import { gmapApi } from 'vue2-google-maps';

export default {
  props: {
    markers: {
      type: Array,
      default: null,
    },
    isAddNewMarker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialLat: -29.1670,
      initialLng: -51.1812,
      newMarker: {
        lat: this.initialLat,
        lng: this.initialLng,
      },
    };
  },
  computed: {
    google: gmapApi,
  },
  methods: {
    onClickMarker(center) {
      this.newMarker.lat = center.lat();
      this.newMarker.lng = center.lng();
    },
    getPosition(marker) {
      return new this.google.maps.LatLng(marker.lat, marker.lng);
    },
  },
};
</script>

<template>
  <GmapMap
  :center="{lat:initialLat, lng:initialLng}"
  :zoom="12"
  map-type-id="roadmap"
  style="width:100%; min-width:600px; height:400px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="getPosition(m.lat, m.lng)"
  />
  <GmapMarker
    v-if="isAddNewMarker && google"
    :position="getPosition(newMarker)"
    :clickable="true"
    :draggable="true"
    @click="onClickMarker(center)"
  />
</GmapMap>
</template>

<style type="scss" module>
.map {
  width: 100%;
  height: 'auto';
}
</style>
