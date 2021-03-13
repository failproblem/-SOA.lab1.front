<template>
  <div class="list row">
    <div class="col-md-9">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Filter By String"
          v-model="filterBy"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Sort By String"
          v-model="orderBy"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Page Size"
          v-model="pageSize"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Page Number"
          v-model="pageNumber"
        />
      </div>
      <div class="input-group-append mb-5">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="refreshList"
        >
          Get routes
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Routes List</h4>
      <ul class="list-group mb-5">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(route, index) in routes"
          :key="index"
          @click="setActiveRoute(route, index)"
        >
          ID: {{ route.id }} {{ route.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentRoute">
        <h4>Route</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentRoute.id }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentRoute.name }}
        </div>
        <div>
          <label><strong>Creation date:</strong></label>
          {{ currentRoute.creationDate }}
        </div>
        <div>
          <label><strong>Coordinates:</strong></label> X:
          {{ currentRoute.coordinates.x }} | Y: {{ currentRoute.coordinates.y }}
        </div>
        <div>
          <label><strong>From location:</strong></label> Name:
          {{ currentRoute.from.name }} | X: {{ currentRoute.from.x }} | Y:
          {{ currentRoute.from.y }} | Z: {{ currentRoute.from.z }}
        </div>
        <div>
          <label><strong>To location:</strong></label> Name:
          {{ currentRoute.to.name }} | X: {{ currentRoute.to.x }} | Y:
          {{ currentRoute.to.y }} | Z: {{ currentRoute.to.z }}
        </div>
        <div>
          <label><strong>Distance:</strong></label> {{ currentRoute.distance }}
        </div>
        <router-link
          :to="'/routes/' + currentRoute.id"
          class="badge badge-success"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Click on a route to see info</p>
      </div>
    </div>
  </div>
</template>

<script>
import RoutesDataService from "../services/RoutesDataService";

export default {
  name: "routes",
  data() {
    return {
      routes: [],
      currentRoute: null,
      currentIndex: -1,
      filterBy: "",
      orderBy: "",
      pageSize: 0,
      pageNumber: 0
    };
  },

  methods: {
    retrieveRoutes() {
      RoutesDataService.getRoutesList(
        this.filterBy,
        this.orderBy,
        this.pageSize,
        this.pageNumber
      )
        .then(response => {
          this.routes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          alert(e);
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRoutes();
      this.currentRoute = null;
      this.currentIndex = -1;
    },

    setActiveRoute(route, index) {
      this.currentRoute = route;
      this.currentIndex = index;
    }
  },

  mounted() {
    this.retrieveRoutes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 900px;
  margin: auto;
}
</style>
