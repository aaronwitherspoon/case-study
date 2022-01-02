import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "@/pages/index"
import DepartureTable from "@/components/DepartureTable"

describe("Tests", () => {

   it("renders a heading", () => {
      render(<Home />)

      const heading = screen.getByRole("heading", {
         name: /Real-time Departures/i,
      })

      expect(heading).toBeInTheDocument();
   })

   it("renders a table", () => {
      render(<DepartureTable />)

      const table = screen.getByRole("table")

      expect(table).toBeInTheDocument();
   })

   it("renders table info from props with no departures", () => {
      const departures = {"departures": [], "stops": [{"description": "test data", "stop_id": 12345}]}

      render(<DepartureTable props={departures} />) 

      const tableHeaderDescription = screen.getByTestId("table-head-description")
      const tableHeaderStopid = screen.getByTestId("table-head-stopid")
      const tableNoDepartures = screen.getByTestId("table-no-departures")

      expect(tableHeaderDescription).toHaveTextContent(departures.stops[0].description)
      expect(tableHeaderStopid).toHaveTextContent(departures.stops[0].stop_id)
      expect(tableNoDepartures).toHaveTextContent("There are no departures at this time")
   })

   it("renders table info from props with departures", () => {
      const departures = {
         "departures": [
            {"actual": true, "departure_text": "5 Min", "route_short_name": "Test route", "description": "test destination", "trip_id": "1"},
            {"actual": false, "departure_text": "12:34", "route_short_name": "Another route name", "description": "Another destination name", "trip_id": "2"},
         ], 
         "stops": [{"description": "test data", "stop_id": 12345}]
      }

      render(<DepartureTable props={departures} />) 

      const tableHeaderDescription = screen.getByTestId("table-head-description")
      const tableHeaderStopid = screen.getByTestId("table-head-stopid")
      const tableNoDepartures = screen.queryByTestId("table-no-departures")
      const routeRow1 = screen.getByTestId("table-route-0")
      const destinationRow1 = screen.getByTestId("table-destination-0")
      const departsRow1 = screen.getByTestId("table-departs-0")
      const routeRow2 = screen.getByTestId("table-route-1")
      const destinationRow2 = screen.getByTestId("table-destination-1")
      const departsRow2 = screen.getByTestId("table-departs-1")
      const routeRow3 = screen.queryByTestId("table-route-2")
      
      expect(tableHeaderDescription).toHaveTextContent(departures.stops[0].description)
      expect(tableHeaderStopid).toHaveTextContent(departures.stops[0].stop_id)
      expect(tableNoDepartures).toBeNull()
      expect(routeRow1).toHaveTextContent(departures.departures[0].route_short_name)
      expect(destinationRow1).toHaveTextContent(departures.departures[0].description)
      expect(departsRow1).toHaveTextContent(departures.departures[0].departure_text)
      expect(routeRow2).toHaveTextContent(departures.departures[1].route_short_name)
      expect(destinationRow2).toHaveTextContent(departures.departures[1].description)
      expect(departsRow2).toHaveTextContent(departures.departures[1].departure_text)
      expect(routeRow3).toBeNull()

   })

})