import http from "../http-common";

class RoutesDataService {
  getRoute(id) {
    return http.get(`/routes/${id}`);
  }

  getFarRoute() {
    return http.get("/far-route");
  }

  getGroupedCoordinates() {
    return http.get("/group-coordinates");
  }

  getHigherDistanceRoutes(distance) {
    return http.get(`/higher-distance?distance=${distance}`);
  }

  getRoutesList(filters, sorts, pageSize, pageNumber) {
    let query = "/routes?";

    if (filters.length > 0) {
      query += `filter_by=${filters}&`;
    }

    if (sorts.length > 0) {
      query += `sort_by=${sorts}&`;
    }

    query += `page_size=${pageSize}&page_number=${pageNumber}`;

    return http.get(query);
  }

  createRoute(
    name,
    x,
    y,
    fromX,
    fromY,
    fromZ,
    fromName,
    toX,
    toY,
    toZ,
    toName
  ) {
    return http.post(
      `/routes?name=${name}&x=${x}&y=${y}` +
        `&from_x=${fromX}&from_y=${fromY}&from_z=${fromZ}&from_name=${fromName}` +
        `&to_x=${toX}&to_y=${toY}&to_z=${toZ}&to_name=${toName}`
    );
  }

  updateRoute(
    id,
    name,
    x,
    y,
    fromX,
    fromY,
    fromZ,
    fromName,
    toX,
    toY,
    toZ,
    toName
  ) {
    return http.put(
      `/routes/${id}?name=${name}&x=${x}&y=${y}` +
        `&from_x=${fromX}&from_y=${fromY}&from_z=${fromZ}&from_name=${fromName}` +
        `&to_x=${toX}&to_y=${toY}&to_z=${toZ}&to_name=${toName}`
    );
  }

  deleteRoute(id) {
    return http.delete(`/routes/${id}`);
  }
}

export default new RoutesDataService();
