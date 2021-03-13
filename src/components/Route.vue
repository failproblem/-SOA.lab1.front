<template>
  <div v-if="currentRoute" class="edit-form">
    <h4>Route</h4>
    <form>
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentRoute.name"
        />
      </div>
      <hr />
      <div class="form-group">
        <h5>Coordinates</h5>
        <label for="x">X</label>
        <input
          type="number"
          class="form-control"
          id="x"
          v-model="currentRoute.coordinates.x"
        />
        <label for="x">Y</label>
        <input
          type="number"
          class="form-control"
          id="y"
          v-model="currentRoute.coordinates.y"
        />
      </div>
      <hr />
      <div class="form-group">
        <h5>Location (from)</h5>
        <label for="from_x">X</label>
        <input
          type="number"
          class="form-control"
          id="from_x"
          v-model="currentRoute.from.x"
        />
        <label for="from_y">Y</label>
        <input
          type="number"
          class="form-control"
          id="from_y"
          v-model="currentRoute.from.y"
        />
        <label for="from_z">Z</label>
        <input
          type="number"
          class="form-control"
          id="from_z"
          v-model="currentRoute.from.z"
        />
        <label for="from_name">Name</label>
        <input
          type="text"
          class="form-control"
          id="from_name"
          v-model="currentRoute.from.name"
        />
      </div>
      <hr />
      <div class="form-group">
        <h5>Location (to)</h5>
        <label for="to_x">X</label>
        <input
          type="number"
          class="form-control"
          id="to_x"
          v-model="currentRoute.to.x"
        />
        <label for="to_y">Y</label>
        <input
          type="number"
          class="form-control"
          id="to_y"
          v-model="currentRoute.to.y"
        />
        <label for="to_z">Z</label>
        <input
          type="number"
          class="form-control"
          id="to_z"
          v-model="currentRoute.to.z"
        />
        <label for="to_name">Name</label>
        <input
          type="text"
          class="form-control"
          id="to_name"
          v-model="currentRoute.to.name"
        />
      </div>
    </form>

    <button type="submit" class="badge badge-success mr-2" @click="updateRoute">
      Update
    </button>
    <button class="badge badge-danger mr-2 mb-5" @click="deleteRoute">
      Delete
    </button>
  </div>

  <div v-else>
    <br />
    <p>Please click on a route</p>
  </div>
</template>

<script>
import RoutesDataService from "../services/RoutesDataService";

export default {
  name: "route",
  data() {
    return {
      currentRoute: null
    };
  },

  methods: {
    getRoute(id) {
      RoutesDataService.getRoute(id)
        .then(response => {
          this.currentRoute = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateRoute() {
      RoutesDataService.updateRoute(
        this.currentRoute.id,
        this.currentRoute.name,
        this.currentRoute.coordinates.x,
        this.currentRoute.coordinates.y,
        this.currentRoute.from.x,
        this.currentRoute.from.y,
        this.currentRoute.from.z,
        this.currentRoute.from.name,
        this.currentRoute.to.x,
        this.currentRoute.to.y,
        this.currentRoute.to.z,
        this.currentRoute.to.name
      )
        .then(response => {
          console.log(response.data);
          alert("Route was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteRoute() {
      RoutesDataService.deleteRoute(this.currentRoute.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "routes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.getRoute(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
