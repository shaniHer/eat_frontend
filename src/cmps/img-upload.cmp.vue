<template>
  <div class="img-upload-container">
    <template v-if="!isLoading">
      <!-- UPLOAD IMG -->
      <label
        for="img-uploader"
        @drop.prevent="handleFile"
        @dragover.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        :class="{ drag: isDragOver }"
      >
        <h3 v-if="!isDragOver">Add image</h3>

        <h3 v-else>Drop image here</h3>
      </label>

      <!-- HIDDEN INPUT -->
      <input
        type="file"
        name="img-uploader"
        id="img-uploader"
        @change="handleFile"
      />
    </template>

    <!-- LOADER -->
    <img
      class="loader"
      v-else
      src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
      alt=""
    />
  </div>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      isLoading: false,
      isDragOver: false,
    };
  },
  methods: {
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.$emit("save", res.url);
      this.isLoading = false;
    },
  },
};
</script>

<style>
.loader {
  height: 150px;
}

#img-uploader {
  width: 0;
  height: 0;
}
.drag {
  color: grey;
  display: inline-block;
  padding: 30px 5px;
  width: 100%;
  height: 100%;
  border: 1px dashed gray;
  border-radius: 8px;
}
</style>