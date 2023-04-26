<script>
import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { getMarkerLocation } from '@utils/google';

export default {
  components: { BFormGroup, BFormInput },
  props: {
    markers: {
      type: Array,
      default: null,
    },
    addNewMarker: {
      type: Boolean,
      default: false,
    },
    markerLat: {
      type: Number,
      default: null,
    },
    markerLng: {
      type: Number,
      default: null,
    },
    isEditMode: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      initialLat: -29.1670,
      initialLng: -51.1812,
      newMarker: {
        lat: 0,
        lng: 0,
      },
      newMarkerLocation: '',
    };
  },
  mounted() {
    this.setInitialPosition();
  },
  methods: {
    setInitialPosition() {
      this.newMarker.lat = this.markerLat ? this.markerLat : this.initialLat;
      this.newMarker.lng = this.markerLng ? this.markerLng : this.initialLng;
      this.setMarkerLocation(this.newMarker);
    },
    onClickMarker(event) {
      const { latLng } = event;
      this.newMarker.lat = latLng.lat();
      this.newMarker.lng = latLng.lng();
      this.setMarkerLocation(this.newMarker);
      this.$emit('updateLatLng', this.newMarker.lat, this.newMarker.lng);
    },
    async setMarkerLocation(marker) {
      this.newMarkerLocation = await getMarkerLocation(marker);
    },
  },
};
</script>

<template>
  <div>
    <b-form-group
      id="location"
      label="Localização"
      label-for="location"
      description=""
      class="formLabel"
    >
      <b-form-input
        id="location-input"
        v-model="newMarkerLocation"
        class="textInput"
        type="text"
        placeholder="isEditMode"
        readonly
      ></b-form-input>
    </b-form-group>

    <GmapMap
      :center="{lat:newMarker.lat, lng:newMarker.lng}"
      :zoom="12"
      map-type-id="roadmap"
      :class="$style.map"
      :options="{
        zoomControl: isEditMode,
        mapTypeControl: isEditMode,
        scaleControl: isEditMode,
        streetViewControl: isEditMode,
        rotateControl: isEditMode,
        fullscreenControl: isEditMode,
        disableDefaultUi: !isEditMode
      }"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m"
      />

      <GmapMarker
        v-if="addNewMarker"
        :position="newMarker"
        draggable
        @dragend="onClickMarker($event)"
      />
    </GmapMap>
  </div>

</template>

<style lang="scss" module>
.map {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 400px;
}
</style>
