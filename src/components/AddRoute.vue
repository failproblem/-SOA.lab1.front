<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="route.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="x">Coordinates (X)</label>
        <input
          type="number"
          class="form-control"
          id="x"
          required
          v-model="route.x"
          name="x"
        />
      </div>
      <div class="form-group">
        <label for="y">Coordinates (Y)</label>
        <input
          type="number"
          class="form-control"
          id="y"
          required
          v-model="route.y"
          name="y"
        />
      </div>
      <div class="form-group">
        <label for="fromX">From location (X)</label>
        <input
          type="number"
          class="form-control"
          id="fromX"
          required
          v-model="route.fromX"
          name="fromX"
        />
      </div>
      <div class="form-group">
        <label for="fromy">From location (Y)</label>
        <input
          type="number"
          class="form-control"
          id="fromY"
          required
          v-model="route.fromY"
          name="fromY"
        />
      </div>
      <div class="form-group">
        <label for="fromZ">From location (Z)</label>
        <input
          type="number"
          class="form-control"
          id="fromZ"
          required
          v-model="route.fromZ"
          name="fromZ"
        />
      </div>
      <div class="form-group">
        <label for="fromName">From location (name)</label>
        <input
          type="text"
          class="form-control"
          id="fromName"
          required
          v-model="route.fromName"
          name="fromName"
        />
      </div>
      <div class="form-group">
        <label for="toX">To location (X)</label>
        <input
          type="number"
          class="form-control"
          id="toX"
          required
          v-model="route.toX"
          name="toX"
        />
      </div>
      <div class="form-group">
        <label for="toY">To location (Y)</label>
        <input
          type="number"
          class="form-control"
          id="toY"
          required
          v-model="route.toY"
          name="toY"
        />
      </div>
      <div class="form-group">
        <label for="toZ">To location (Z)</label>
        <input
          type="number"
          class="form-control"
          id="toZ"
          required
          v-model="route.toZ"
          name="toZ"
        />
      </div>
      <div class="form-group">
        <label for="toName">To location (name)</label>
        <input
          type="text"
          class="form-control"
          id="toName"
          required
          v-model="route.toName"
          name="toName"
        />
      </div>
      <button @click="createRoute" class="btn btn-success mb-5">Create</button>
    </div>
    <div v-else>
      <h4>Route created successfully!</h4>
      <button class="btn btn-success mb-5" @click="newRoute">
        Create more
      </button>
    </div>
  </div>
</template>

<script>
import RoutesDataService from "../services/RoutesDataService";

export default {
  name: "add",

  data() {
    return {
      submitted: false,
      route: {
        name: "",
        x: 0.0,
        y: 0.0,
        fromX: 0,
        fromY: 0,
        fromZ: 0,
        fromName: "",
        toX: 0,
        toY: 0,
        toZ: 0,
        toName: ""
      }
    };
  },

  methods: {
    createRoute() {
      RoutesDataService.createRoute(
        this.route.name,
        this.route.x,
        this.route.y,
        this.route.fromX,
        this.route.fromY,
        this.route.fromZ,
        this.route.fromName,
        this.route.toX,
        this.route.toY,
        this.route.toZ,
        this.route.toName
      )
        .then(response => {
          this.submitted = true;
          console.log(response.data);
        })
        .catch(e => {
          alert(e);
          console.log(e);
        });
    },

    newRoute() {
      this.submitted = false;
      this.route = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
