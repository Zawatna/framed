<script setup>
import { AppState } from '@/AppState.js';
import { Modal } from 'bootstrap';
import { computed} from 'vue';

const photos = [
  {
    name: 'rhinos',
    imgUrl: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmhpbm98ZW58MHwyfDB8fHww',
  },
  {
    name: 'kitten',
    imgUrl: 'https://images.unsplash.com/photo-1694239400333-0051c92d420f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0dGVufGVufDB8MnwwfHx8MA%3D%3D',
  },
  {
    name: 'flower',
    imgUrl: 'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zmxvd2Vyc3xlbnwwfDJ8MHx8fDA%3D',
  },
  {
    name: 'boat',
    imgUrl: 'https://images.unsplash.com/photo-1663550352112-9b62454ec577?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGhlJTIwb2NlYW58ZW58MHwyfDB8fHww',
  },
  {
    name: 'Taj Mahal',
    imgUrl: 'https://images.unsplash.com/photo-1690812161626-3a034b109a38?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGNvbmNlcnR8ZW58MHwyfDB8fHww',
  },
  {
    name: 'yoga guy',
    imgUrl: 'https://plus.unsplash.com/premium_photo-1726736480651-df15be52ba93?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhbG18ZW58MHwyfDB8fHww',
  },
];

// const chosenPhotoIndex = computed(() => AppState.choicePhotoIndex);

let chosenPhoto = computed( () => {
  if (AppState.choicePhotoIndex > photos.length-1) {
    AppState.choicePhotoIndex = 0;
  }
  return photos[AppState.choicePhotoIndex]
})

function openForm(choice) {
  Modal.getOrCreateInstance('#popChoice').hide();
  if (choice == 'photo') {
    Modal.getOrCreateInstance('#photoUploadForm').show();
  } else {
    Modal.getOrCreateInstance('#albumUploadForm').show();
  }
}


</script>


<template>
  <div class="container-fluid">
    <div class="row text-center">
      <!-- SECTION Photo Upload Choice -->
      <div class="col-6">
        <img v-if="chosenPhoto" :src="chosenPhoto?.imgUrl" :alt="chosenPhoto?.name" class="img-fluid photo rounded">
        <button @click="openForm('photo')" type="button" class="btn btn-success mt-2">Add Photo</button>
      </div>
      <!-- !SECTION -->
      <!-- SECTION Album Upload Choice -->
      <div class="col-6">
        <img src="https://images.unsplash.com/photo-1677658288237-2fff291a34f0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG8lMjBhbGJ1bXxlbnwwfDJ8MHx8fDA%3D" alt="photo album" class="img-fluid album rounded">
        <button @click="openForm('album')" type="button" class="btn btn-warning mt-2">Add Album</button>
      </div>
      <!-- !SECTION -->
    </div>
  </div>
</template>


<style lang="scss" scoped>


.photo {
  height: 80%;
  border: 2px dotted #35E286;
}

.album {
  height: 80%;
  border: 2px dotted #DA35B0;
}
</style>