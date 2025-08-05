const getCitySuggestions = require("../controllers/geocodingController");
const fetchGeocodingData = require("../services/geocodingService");

jest.mock("../services/geocodingService");

describe("getCitySuggestions controller", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { city: "Berlin" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return city suggestions if found", async () => {
    const mockResults = [
      {
        name: "Berlin",
        country: "Deutschland",
        region: "Berlin",
        latitude: 52.52437,
        longitude: 13.41053,
      },
    ];
    fetchGeocodingData.mockResolvedValue(mockResults);

    await getCitySuggestions(req, res);

    expect(fetchGeocodingData).toHaveBeenCalledWith("Berlin");
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });

  it("should return 404 if no cities found", async () => {
    fetchGeocodingData.mockResolvedValue([]);

    await getCitySuggestions(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No cities found" });
  });

  it("should return 500 if service throws", async () => {
    fetchGeocodingData.mockRejectedValue(new Error("fail"));

    await getCitySuggestions(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch city suggestions.",
    });
  });
});
