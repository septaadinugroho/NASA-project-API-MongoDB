const { getAllLaunches, scheduleNewLaunch, existLaunchWithId, abortLaunchById } = require("../../models/launches.model");

//dapetin isi planetnya
async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

//nambahin data launch
async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  //property yang dibutuhin
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  //jika tanggal yang dimasukan bukan angka
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  //jadwalin launch baru dari model
  await scheduleNewLaunch(launch);
  console.log(launch);
  return res.status(201).json(launch);
}
//batalin launch
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existLaunch = await existLaunchWithId(launchId);
  if (!existLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

//export functionnya
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
