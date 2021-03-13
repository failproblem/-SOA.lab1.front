<template>
  <div class="list row">
    <div class="col-md-9">
      <div class="input-group">
        <p>
          Получение элементов, значение поля 'distance' которых больше
          введённого
        </p>
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Distance"
          v-model="distance"
        />
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="higherDistance"
        >
          Get
        </button>
      </div>
      <hr />
      <div class="input-group">
        <p>
          Сгруппировать элементы по значению поля 'coordinates', вернуть
          количество элементов в каждой группе
        </p>
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="groupByCoords"
        >
          Get
        </button>
      </div>
      <hr />
      <div class="input-group">
        <p>
          Получение элемента, значение поля 'to' которого является максимальным
        </p>
      </div>
      <div class="input-group-append">
        <button
          id="get=far-route-btn"
          class="btn btn-outline-secondary"
          type="button"
          @click="farRoute"
        >
          Get
        </button>
      </div>
      <hr />
    </div>
    <div class="col-md-6">
      <h4>Results</h4>
      <ul class="list-group mb-5">
        <li
          class="list-group-item"
          :class="{ active: true === currentIndex }"
          v-if="route"
          @click="setActiveRoute(route)"
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
    <div class="col-md-6 mb-5">
      <hr />
      <h4>Groups</h4>
      <ul class="list-group mb-5">
        <li
          class="list-group-item"
          v-for="(group, number) in groups"
          :key="group"
        >
          X: {{ group.x }} | Y: {{ group.y }} | {{ number }}
        </li>
      </ul>
    </div>
    <div class="col-md-6 mb-5">
      <hr />
      <h4>Distance</h4>
      <ul class="list-group mb-5">
        <li
          class="list-group-item"
          v-if="distanceResult"
        >
          Number of elements: {{ distanceResult.number_of_elements }}
        </li>
      </ul>
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
      route: null,
      currentIndex: false,
      groups: {},
      distance: 0,
      distanceResult: null,
      hook: null
    };
  },

  methods: {
    higherDistance() {
      RoutesDataService.getHigherDistanceRoutes(this.distance)
        .then(response => {
          this.distanceResult = response.data;
          console.log(response.data);
        })
        .catch(e => {
          alert(e);
          console.log(e);
        });
    },

    groupByCoords() {
      RoutesDataService.getGroupedCoordinates()
        .then(response => {
          this.groups = response.data;
          console.log(response.data);
        })
        .catch(e => {
          alert(e);
          console.log(e);
        });
    },

    farRoute() {
      this.currentRoute = null;
      this.currentIndex = false;
      RoutesDataService.getFarRoute()
        .then(response => {
          this.route = response.data;
          console.log(response.data);
        })
        .catch(e => {
          alert(e);
          console.log(e);
        });
    },

    setActiveRoute(route) {
      this.currentRoute = route;
      this.currentIndex = true;
    }
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
