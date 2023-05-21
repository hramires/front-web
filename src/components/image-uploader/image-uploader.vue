<script>
import uploadImageToS3 from '@api/uploadImage';

export default {
  props: {
    inputImages: {
      type: Array,
    },
    isEditMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      localImages: this.inputImages,
    };
  },
  watch: {
    inputImages(newValue) {
      this.localImages = newValue;
    },
  },
  computed: {
    images() {
      return this.localImages;
    },
    editMode() {
      if (typeof this.isEditMode !== 'undefined') {
        return this.isEditMode;
      }
      return true;
    },
  },
  methods: {
    showFileInput(index) {
      this.$set(this.localImages, index, {
        ...this.localImages[index],
        inputVisible: true,
      });
      this.$nextTick(() => {
        this.$refs.fileInput[index].click();
      });
    },
    handleImageUpload(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localImages[index] = {
            id: this.localImages.length,
            blank: false,
            blankColor: null,
            src: e.target.result,
          };
          this.localImages = [...this.localImages];
        };
        reader.readAsDataURL(file);
        console.log(uploadImageToS3(file));
        this.$emit('update-images', this.localImages);
      }
    },
    deleteImage(index) {
      if (this.localImages.length > 1) {
        this.localImages.splice(index, 1);
        this.localImages = this.localImages.filter((image) => !image.blank);
        this.localImages.push({
          id: this.localImages.length + 1,
          blank: true,
          blankColor: '#d5e4cf',
          src: '',
        });
      }
      this.$emit('update-images', this.localImages);
    },
  },
};
</script>
<template>
  <div>
    <b-row :class="$style.images">
      <div
        v-for="(image, index) in images"
        :key="`image-${index}`"
        :class="[$style.square, $style.image]"
        class="image rounded m1">
        <b-img
          class="image rounded-lg"
          :src="image.src"
          :blank="image.blank"
          :blankColor="image.blankColor"
          rounded alt="images">
        </b-img>
        <span
          v-if="image.blank && editMode"
          :class="$style.more"
          @click="showFileInput(index)"
        >+</span>
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload($event, index)"
          style="display: none;"
          ref="fileInput"
        />
        <span
          v-if="!image.blank && editMode"
          :class="$style['delete-image']"
          @click="deleteImage(index)"
        >&times;</span>
      </div>
    </b-row>
  </div>
</template>

<style lang="scss" module>
.row {
  padding: 1.4rem 1.75rem;
  margin: 0;
}

.images {
  padding: 0 1rem;
}

.square {
  position: relative;
}

.more {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  color: transparent;
  cursor: pointer;
  user-select: none;
}

.square:hover .more {
  color: white;
}

.delete-image {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5em;
  color: red;
  cursor: pointer;
  user-select: none;
}

.image {
  background-color: unset;
}

</style>
