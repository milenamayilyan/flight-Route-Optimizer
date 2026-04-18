/* ===================================================
   FLIGHT DATA (embedded from flights.csv)
   =================================================== */
const FLIGHTS = [
  ["JFK","LHR",520,7.0,40.6413,-73.7781,51.4700,-0.4543],
  ["LHR","JFK",490,7.5,51.4700,-0.4543,40.6413,-73.7781],
  ["JFK","CDG",480,7.2,40.6413,-73.7781,49.0097,2.5479],
  ["CDG","JFK",460,7.8,49.0097,2.5479,40.6413,-73.7781],
  ["JFK","FRA",510,8.0,40.6413,-73.7781,50.0379,8.5622],
  ["FRA","JFK",495,8.5,50.0379,8.5622,40.6413,-73.7781],
  ["JFK","AMS",500,7.5,40.6413,-73.7781,52.3086,4.7639],
  ["AMS","JFK",480,8.0,52.3086,4.7639,40.6413,-73.7781],
  ["JFK","MAD",430,7.8,40.6413,-73.7781,40.4719,-3.5626],
  ["MAD","JFK",415,8.2,40.4719,-3.5626,40.6413,-73.7781],
  ["JFK","FCO",540,9.0,40.6413,-73.7781,41.8003,12.2389],
  ["FCO","JFK",525,9.5,41.8003,12.2389,40.6413,-73.7781],
  ["JFK","MIA",180,3.0,40.6413,-73.7781,25.7959,-80.2870],
  ["MIA","JFK",175,3.2,25.7959,-80.2870,40.6413,-73.7781],
  ["JFK","LAX",320,5.5,40.6413,-73.7781,33.9425,-118.4081],
  ["LAX","JFK",310,5.0,33.9425,-118.4081,40.6413,-73.7781],
  ["JFK","ORD",190,2.8,40.6413,-73.7781,41.9742,-87.9073],
  ["ORD","JFK",185,2.9,41.9742,-87.9073,40.6413,-73.7781],
  ["JFK","ATL",210,2.5,40.6413,-73.7781,33.6407,-84.4277],
  ["ATL","JFK",200,2.6,33.6407,-84.4277,40.6413,-73.7781],
  ["JFK","DFW",280,3.5,40.6413,-73.7781,32.8998,-97.0403],
  ["DFW","JFK",270,3.8,32.8998,-97.0403,40.6413,-73.7781],
  ["JFK","SEA",350,6.0,40.6413,-73.7781,47.4502,-122.3088],
  ["SEA","JFK",340,5.5,47.4502,-122.3088,40.6413,-73.7781],
  ["JFK","BOS",120,1.2,40.6413,-73.7781,42.3656,-71.0096],
  ["BOS","JFK",115,1.3,42.3656,-71.0096,40.6413,-73.7781],
  ["JFK","DEN",290,4.0,40.6413,-73.7781,39.8561,-104.6737],
  ["DEN","JFK",280,4.2,39.8561,-104.6737,40.6413,-73.7781],
  ["JFK","SFO",340,5.8,40.6413,-73.7781,37.6213,-122.3790],
  ["SFO","JFK",330,5.3,37.6213,-122.3790,40.6413,-73.7781],
  ["LAX","NRT",850,11.5,33.9425,-118.4081,35.7720,140.3929],
  ["NRT","LAX",820,10.5,35.7720,140.3929,33.9425,-118.4081],
  ["LAX","PEK",780,12.0,33.9425,-118.4081,40.0799,116.6031],
  ["PEK","LAX",760,11.5,40.0799,116.6031,33.9425,-118.4081],
  ["LAX","SYD",920,15.5,33.9425,-118.4081,-33.9461,151.1772],
  ["SYD","LAX",900,14.5,-33.9461,151.1772,33.9425,-118.4081],
  ["LAX","SIN",870,17.5,33.9425,-118.4081,1.3644,103.9915],
  ["SIN","LAX",850,16.5,1.3644,103.9915,33.9425,-118.4081],
  ["LAX","MEX",320,3.5,33.9425,-118.4081,19.4363,-99.0721],
  ["MEX","LAX",310,4.0,19.4363,-99.0721,33.9425,-118.4081],
  ["LAX","YVR",180,2.5,33.9425,-118.4081,49.1947,-123.1840],
  ["YVR","LAX",170,2.8,49.1947,-123.1840,33.9425,-118.4081],
  ["LHR","CDG",120,1.2,51.4700,-0.4543,49.0097,2.5479],
  ["CDG","LHR",115,1.3,49.0097,2.5479,51.4700,-0.4543],
  ["LHR","FRA",140,1.8,51.4700,-0.4543,50.0379,8.5622],
  ["FRA","LHR",135,1.9,50.0379,8.5622,51.4700,-0.4543],
  ["LHR","AMS",110,1.1,51.4700,-0.4543,52.3086,4.7639],
  ["AMS","LHR",105,1.2,52.3086,4.7639,51.4700,-0.4543],
  ["LHR","DXB",450,7.0,51.4700,-0.4543,25.2532,55.3657],
  ["DXB","LHR",440,7.5,25.2532,55.3657,51.4700,-0.4543],
  ["LHR","BOM",480,9.0,51.4700,-0.4543,19.0896,72.8656],
  ["BOM","LHR",465,9.5,19.0896,72.8656,51.4700,-0.4543],
  ["LHR","SIN",560,13.0,51.4700,-0.4543,1.3644,103.9915],
  ["SIN","LHR",545,13.5,1.3644,103.9915,51.4700,-0.4543],
  ["LHR","NRT",680,12.0,51.4700,-0.4543,35.7720,140.3929],
  ["NRT","LHR",665,12.5,35.7720,140.3929,51.4700,-0.4543],
  ["LHR","JNB",560,11.0,51.4700,-0.4543,-26.1392,28.2460],
  ["JNB","LHR",545,11.5,-26.1392,28.2460,51.4700,-0.4543],
  ["LHR","GRU",620,11.5,51.4700,-0.4543,-23.4356,-46.4731],
  ["GRU","LHR",605,12.0,-23.4356,-46.4731,51.4700,-0.4543],
  ["LHR","YYZ",450,7.5,51.4700,-0.4543,43.6777,-79.6248],
  ["YYZ","LHR",435,8.0,43.6777,-79.6248,51.4700,-0.4543],
  ["FRA","DXB",380,6.5,50.0379,8.5622,25.2532,55.3657],
  ["DXB","FRA",370,7.0,25.2532,55.3657,50.0379,8.5622],
  ["FRA","PEK",620,10.5,50.0379,8.5622,40.0799,116.6031],
  ["PEK","FRA",605,11.0,40.0799,116.6031,50.0379,8.5622],
  ["FRA","NRT",640,12.0,50.0379,8.5622,35.7720,140.3929],
  ["NRT","FRA",625,12.5,35.7720,140.3929,50.0379,8.5622],
  ["FRA","GRU",580,12.0,50.0379,8.5622,-23.4356,-46.4731],
  ["GRU","FRA",565,12.5,-23.4356,-46.4731,50.0379,8.5622],
  ["FRA","BOM",430,8.5,50.0379,8.5622,19.0896,72.8656],
  ["BOM","FRA",415,9.0,19.0896,72.8656,50.0379,8.5622],
  ["FRA","SIN",540,12.5,50.0379,8.5622,1.3644,103.9915],
  ["CDG","MAD",150,2.0,49.0097,2.5479,40.4719,-3.5626],
  ["MAD","CDG",145,2.1,40.4719,-3.5626,49.0097,2.5479],
  ["CDG","FCO",160,2.2,49.0097,2.5479,41.8003,12.2389],
  ["FCO","CDG",155,2.3,41.8003,12.2389,49.0097,2.5479],
  ["CDG","BCN",130,2.0,49.0097,2.5479,41.2974,2.0833],
  ["BCN","CDG",125,2.1,41.2974,2.0833,49.0097,2.5479],
  ["CDG","ATH",200,3.5,49.0097,2.5479,37.9364,23.9445],
  ["ATH","CDG",195,3.6,37.9364,23.9445,49.0097,2.5479],
  ["MAD","FCO",170,2.5,40.4719,-3.5626,41.8003,12.2389],
  ["FCO","MAD",165,2.6,41.8003,12.2389,40.4719,-3.5626],
  ["MAD","LIS",90,1.5,40.4719,-3.5626,38.7756,-9.1354],
  ["LIS","MAD",85,1.6,38.7756,-9.1354,40.4719,-3.5626],
  ["LIS","GRU",480,9.5,38.7756,-9.1354,-23.4356,-46.4731],
  ["GRU","LIS",465,10.0,-23.4356,-46.4731,38.7756,-9.1354],
  ["FCO","ATH",140,2.2,41.8003,12.2389,37.9364,23.9445],
  ["ATH","FCO",135,2.3,37.9364,23.9445,41.8003,12.2389],
  ["ATH","IST",100,1.5,37.9364,23.9445,40.9769,28.8146],
  ["IST","ATH",95,1.6,40.9769,28.8146,37.9364,23.9445],
  ["IST","DXB",200,3.5,40.9769,28.8146,25.2532,55.3657],
  ["DXB","IST",195,3.6,25.2532,55.3657,40.9769,28.8146],
  ["IST","JFK",520,10.0,40.9769,28.8146,40.6413,-73.7781],
  ["JFK","IST",505,10.5,40.6413,-73.7781,40.9769,28.8146],
  ["DXB","BOM",180,3.0,25.2532,55.3657,19.0896,72.8656],
  ["BOM","DXB",175,3.2,19.0896,72.8656,25.2532,55.3657],
  ["DXB","SIN",320,7.0,25.2532,55.3657,1.3644,103.9915],
  ["SIN","DXB",310,7.5,1.3644,103.9915,25.2532,55.3657],
  ["DXB","NRT",580,9.5,25.2532,55.3657,35.7720,140.3929],
  ["NRT","DXB",565,10.0,35.7720,140.3929,25.2532,55.3657],
  ["DXB","SYD",650,14.0,25.2532,55.3657,-33.9461,151.1772],
  ["SYD","DXB",635,14.5,-33.9461,151.1772,25.2532,55.3657],
  ["DXB","NBO",280,5.0,25.2532,55.3657,-1.3192,36.9275],
  ["NBO","DXB",270,5.2,-1.3192,36.9275,25.2532,55.3657],
  ["DXB","CMB",190,4.0,25.2532,55.3657,7.1803,79.8842],
  ["CMB","DXB",185,4.2,7.1803,79.8842,25.2532,55.3657],
  ["DXB","KHI",120,2.5,25.2532,55.3657,24.9008,67.1681],
  ["KHI","DXB",115,2.6,24.9008,67.1681,25.2532,55.3657],
  ["DXB","DEL",180,3.5,25.2532,55.3657,28.5665,77.1031],
  ["DEL","DXB",175,3.6,28.5665,77.1031,25.2532,55.3657],
  ["BOM","DEL",80,2.0,19.0896,72.8656,28.5665,77.1031],
  ["DEL","BOM",75,2.1,28.5665,77.1031,19.0896,72.8656],
  ["BOM","BKK",230,4.5,19.0896,72.8656,13.6811,100.7472],
  ["BKK","BOM",225,4.8,13.6811,100.7472,19.0896,72.8656],
  ["BOM","SIN",280,5.5,19.0896,72.8656,1.3644,103.9915],
  ["SIN","BOM",270,5.8,1.3644,103.9915,19.0896,72.8656],
  ["DEL","NRT",540,8.5,28.5665,77.1031,35.7720,140.3929],
  ["NRT","DEL",525,9.0,35.7720,140.3929,28.5665,77.1031],
  ["BKK","SIN",110,2.5,13.6811,100.7472,1.3644,103.9915],
  ["SIN","BKK",105,2.6,1.3644,103.9915,13.6811,100.7472],
  ["BKK","NRT",380,6.5,13.6811,100.7472,35.7720,140.3929],
  ["NRT","BKK",370,7.0,35.7720,140.3929,13.6811,100.7472],
  ["BKK","PEK",280,4.5,13.6811,100.7472,40.0799,116.6031],
  ["PEK","BKK",270,4.8,40.0799,116.6031,13.6811,100.7472],
  ["BKK","HKG",180,3.0,13.6811,100.7472,22.3080,113.9185],
  ["HKG","BKK",175,3.2,22.3080,113.9185,13.6811,100.7472],
  ["SIN","HKG",190,3.5,1.3644,103.9915,22.3080,113.9185],
  ["HKG","SIN",185,3.6,22.3080,113.9185,1.3644,103.9915],
  ["SIN","SYD",380,8.0,1.3644,103.9915,-33.9461,151.1772],
  ["SYD","SIN",370,8.5,-33.9461,151.1772,1.3644,103.9915],
  ["SIN","NRT",380,7.0,1.3644,103.9915,35.7720,140.3929],
  ["NRT","SIN",370,7.5,35.7720,140.3929,1.3644,103.9915],
  ["HKG","NRT",250,4.0,22.3080,113.9185,35.7720,140.3929],
  ["NRT","HKG",240,4.2,35.7720,140.3929,22.3080,113.9185],
  ["HKG","PEK",200,3.5,22.3080,113.9185,40.0799,116.6031],
  ["PEK","HKG",195,3.6,40.0799,116.6031,22.3080,113.9185],
  ["HKG","SYD",450,9.5,22.3080,113.9185,-33.9461,151.1772],
  ["SYD","HKG",440,10.0,-33.9461,151.1772,22.3080,113.9185],
  ["PEK","NRT",180,3.5,40.0799,116.6031,35.7720,140.3929],
  ["NRT","PEK",175,3.6,35.7720,140.3929,40.0799,116.6031],
  ["PEK","ICN",130,2.0,40.0799,116.6031,37.4602,126.4407],
  ["ICN","PEK",125,2.1,37.4602,126.4407,40.0799,116.6031],
  ["ICN","NRT",200,2.5,37.4602,126.4407,35.7720,140.3929],
  ["NRT","ICN",195,2.6,35.7720,140.3929,37.4602,126.4407],
  ["ICN","JFK",700,13.5,37.4602,126.4407,40.6413,-73.7781],
  ["JFK","ICN",685,14.0,40.6413,-73.7781,37.4602,126.4407],
  ["NRT","SYD",580,10.0,35.7720,140.3929,-33.9461,151.1772],
  ["SYD","NRT",565,9.5,-33.9461,151.1772,35.7720,140.3929],
  ["SYD","MEL",110,1.5,-33.9461,151.1772,-37.6690,144.8410],
  ["MEL","SYD",105,1.6,-37.6690,144.8410,-33.9461,151.1772],
  ["SYD","AKL",220,3.5,-33.9461,151.1772,-37.0082,174.7850],
  ["AKL","SYD",215,3.6,-37.0082,174.7850,-33.9461,151.1772],
  ["MEL","SIN",340,8.0,-37.6690,144.8410,1.3644,103.9915],
  ["SIN","MEL",330,8.5,1.3644,103.9915,-37.6690,144.8410],
  ["JNB","NBO",300,4.5,-26.1392,28.2460,-1.3192,36.9275],
  ["NBO","JNB",290,4.8,-1.3192,36.9275,-26.1392,28.2460],
  ["JNB","LOS",480,6.5,-26.1392,28.2460,6.5774,3.3211],
  ["LOS","JNB",465,7.0,6.5774,3.3211,-26.1392,28.2460],
  ["JNB","CPT",130,2.0,-26.1392,28.2460,-33.9648,18.6017],
  ["CPT","JNB",125,2.1,-33.9648,18.6017,-26.1392,28.2460],
  ["JNB","ADD",390,5.0,-26.1392,28.2460,8.9779,38.7990],
  ["ADD","JNB",380,5.2,8.9779,38.7990,-26.1392,28.2460],
  ["NBO","ADD",150,2.0,-1.3192,36.9275,8.9779,38.7990],
  ["ADD","NBO",145,2.1,8.9779,38.7990,-1.3192,36.9275],
  ["LOS","ACC",140,1.5,6.5774,3.3211,5.6052,-0.1717],
  ["ACC","LOS",135,1.6,5.6052,-0.1717,6.5774,3.3211],
  ["GRU","EZE",200,3.0,-23.4356,-46.4731,-34.8222,-58.5358],
  ["EZE","GRU",195,3.2,-34.8222,-58.5358,-23.4356,-46.4731],
  ["GRU","BOG",260,5.0,-23.4356,-46.4731,4.7016,-74.1469],
  ["BOG","GRU",250,5.2,4.7016,-74.1469,-23.4356,-46.4731],
  ["GRU","SCL",180,4.0,-23.4356,-46.4731,-33.3929,-70.7854],
  ["SCL","GRU",175,4.2,-33.3929,-70.7854,-23.4356,-46.4731],
  ["GRU","LIM",280,5.0,-23.4356,-46.4731,-12.0219,-77.1143],
  ["LIM","GRU",270,5.2,-12.0219,-77.1143,-23.4356,-46.4731],
  ["MEX","BOG",260,4.5,19.4363,-99.0721,4.7016,-74.1469],
  ["BOG","MEX",250,4.8,4.7016,-74.1469,19.4363,-99.0721],
  ["MEX","GRU",560,9.5,19.4363,-99.0721,-23.4356,-46.4731],
  ["GRU","MEX",545,10.0,-23.4356,-46.4731,19.4363,-99.0721],
  ["BOG","MIA",260,4.5,4.7016,-74.1469,25.7959,-80.2870],
  ["MIA","BOG",250,4.8,25.7959,-80.2870,4.7016,-74.1469],
  ["LIM","MIA",420,5.5,-12.0219,-77.1143,25.7959,-80.2870],
  ["MIA","LIM",410,6.0,25.7959,-80.2870,-12.0219,-77.1143],
  ["EZE","SCL",150,2.5,-34.8222,-58.5358,-33.3929,-70.7854],
  ["SCL","EZE",145,2.6,-33.3929,-70.7854,-34.8222,-58.5358],
  ["YYZ","ORD",120,1.5,43.6777,-79.6248,41.9742,-87.9073],
  ["ORD","YYZ",115,1.6,41.9742,-87.9073,43.6777,-79.6248],
  ["YYZ","YVR",280,5.0,43.6777,-79.6248,49.1947,-123.1840],
  ["YVR","YYZ",270,5.2,49.1947,-123.1840,43.6777,-79.6248],
  ["YYZ","JFK",130,1.5,43.6777,-79.6248,40.6413,-73.7781],
  ["JFK","YYZ",125,1.6,40.6413,-73.7781,43.6777,-79.6248],
  ["DFW","MEX",180,2.5,32.8998,-97.0403,19.4363,-99.0721],
  ["MEX","DFW",175,2.6,19.4363,-99.0721,32.8998,-97.0403],
  ["MIA","MEX",200,3.0,25.7959,-80.2870,19.4363,-99.0721],
  ["MEX","MIA",195,3.2,19.4363,-99.0721,25.7959,-80.2870],
  ["ORD","DFW",160,2.5,41.9742,-87.9073,32.8998,-97.0403],
  ["DFW","ORD",155,2.6,32.8998,-97.0403,41.9742,-87.9073],
  ["ATL","MIA",140,2.0,33.6407,-84.4277,25.7959,-80.2870],
  ["MIA","ATL",135,2.1,25.7959,-80.2870,33.6407,-84.4277],
  ["ATL","DFW",200,2.8,33.6407,-84.4277,32.8998,-97.0403],
  ["DFW","ATL",195,2.9,32.8998,-97.0403,33.6407,-84.4277],
  ["SEA","SFO",140,2.5,47.4502,-122.3088,37.6213,-122.3790],
  ["SFO","SEA",135,2.6,37.6213,-122.3790,47.4502,-122.3088],
  ["SEA","YVR",70,1.0,47.4502,-122.3088,49.1947,-123.1840],
  ["YVR","SEA",65,1.1,49.1947,-123.1840,47.4502,-122.3088],
  ["DEN","LAX",200,3.0,39.8561,-104.6737,33.9425,-118.4081],
  ["LAX","DEN",195,3.2,33.9425,-118.4081,39.8561,-104.6737],
  ["SFO","LAX",90,1.2,37.6213,-122.3790,33.9425,-118.4081],
  ["LAX","SFO",85,1.3,33.9425,-118.4081,37.6213,-122.3790],
  ["AMS","FRA",100,1.2,52.3086,4.7639,50.0379,8.5622],
  ["FRA","AMS",95,1.3,50.0379,8.5622,52.3086,4.7639],
  ["AMS","CDG",110,1.3,52.3086,4.7639,49.0097,2.5479],
  ["CDG","AMS",105,1.4,49.0097,2.5479,52.3086,4.7639],
  ["AMS","ARN",150,2.0,52.3086,4.7639,59.6519,17.9186],
  ["ARN","AMS",145,2.1,59.6519,17.9186,52.3086,4.7639],
  ["ARN","CPH",80,1.2,59.6519,17.9186,55.6180,12.6508],
  ["CPH","ARN",75,1.3,55.6180,12.6508,59.6519,17.9186],
  ["CPH","FRA",120,1.8,55.6180,12.6508,50.0379,8.5622],
  ["FRA","CPH",115,1.9,50.0379,8.5622,55.6180,12.6508],
  ["ARN","HEL",90,1.2,59.6519,17.9186,60.3172,24.9633],
  ["HEL","ARN",85,1.3,60.3172,24.9633,59.6519,17.9186],
  ["HEL","SVO",120,1.5,60.3172,24.9633,55.9726,37.4146],
  ["SVO","HEL",115,1.6,55.9726,37.4146,60.3172,24.9633],
  ["SVO","FRA",180,3.5,55.9726,37.4146,50.0379,8.5622],
  ["FRA","SVO",175,3.6,50.0379,8.5622,55.9726,37.4146],
  ["SVO","PEK",460,8.0,55.9726,37.4146,40.0799,116.6031],
  ["PEK","SVO",445,8.5,40.0799,116.6031,55.9726,37.4146],
  ["VIE","IST",160,2.5,48.1103,16.5697,40.9769,28.8146],
  ["IST","VIE",155,2.6,40.9769,28.8146,48.1103,16.5697],
  ["VIE","FRA",120,1.5,48.1103,16.5697,50.0379,8.5622],
  ["FRA","VIE",115,1.6,50.0379,8.5622,48.1103,16.5697],
  ["VIE","ATH",150,2.2,48.1103,16.5697,37.9364,23.9445],
  ["ATH","VIE",145,2.3,37.9364,23.9445,48.1103,16.5697],
  ["ZRH","FRA",80,1.0,47.4647,8.5492,50.0379,8.5622],
  ["FRA","ZRH",75,1.1,50.0379,8.5622,47.4647,8.5492],
  ["ZRH","LHR",100,1.5,47.4647,8.5492,51.4700,-0.4543],
  ["LHR","ZRH",95,1.6,51.4700,-0.4543,47.4647,8.5492],
  ["ZRH","JFK",490,8.5,47.4647,8.5492,40.6413,-73.7781],
  ["BCN","FCO",150,2.0,41.2974,2.0833,41.8003,12.2389],
  ["FCO","BCN",145,2.1,41.8003,12.2389,41.2974,2.0833],
  ["BCN","MAD",100,1.2,41.2974,2.0833,40.4719,-3.5626],
  ["MAD","BCN",95,1.3,40.4719,-3.5626,41.2974,2.0833],
  ["BCN","LIS",120,2.0,41.2974,2.0833,38.7756,-9.1354],
  ["LIS","BCN",115,2.1,38.7756,-9.1354,41.2974,2.0833],
  ["WAW","FRA",110,2.0,52.1657,20.9671,50.0379,8.5622],
  ["FRA","WAW",105,2.1,50.0379,8.5622,52.1657,20.9671],
  ["WAW","LHR",130,2.5,52.1657,20.9671,51.4700,-0.4543],
  ["LHR","WAW",125,2.6,51.4700,-0.4543,52.1657,20.9671],
  ["PRG","FRA",90,1.5,50.1008,14.2600,50.0379,8.5622],
  ["FRA","PRG",85,1.6,50.0379,8.5622,50.1008,14.2600],
  ["BUD","VIE",60,1.0,47.4298,19.2610,48.1103,16.5697],
  ["VIE","BUD",55,1.1,48.1103,16.5697,47.4298,19.2610],
  ["CMN","CDG",180,3.0,33.3675,-7.5898,49.0097,2.5479],
  ["CDG","CMN",175,3.1,49.0097,2.5479,33.3675,-7.5898],
  ["CMN","MAD",120,2.0,33.3675,-7.5898,40.4719,-3.5626],
  ["MAD","CMN",115,2.1,40.4719,-3.5626,33.3675,-7.5898],
  ["CAI","LHR",380,4.5,30.1219,31.4056,51.4700,-0.4543],
  ["LHR","CAI",370,4.8,51.4700,-0.4543,30.1219,31.4056],
  ["CAI","DXB",220,3.5,30.1219,31.4056,25.2532,55.3657],
  ["DXB","CAI",215,3.6,25.2532,55.3657,30.1219,31.4056],
  ["CAI","IST",180,3.0,30.1219,31.4056,40.9769,28.8146],
  ["IST","CAI",175,3.1,40.9769,28.8146,30.1219,31.4056],
  ["ADD","DXB",290,4.5,8.9779,38.7990,25.2532,55.3657],
  ["DXB","ADD",280,4.8,25.2532,55.3657,8.9779,38.7990],
  ["NBO","BOM",300,5.0,-1.3192,36.9275,19.0896,72.8656],
  ["BOM","NBO",290,5.2,19.0896,72.8656,-1.3192,36.9275],
  ["CMB","SIN",280,4.5,7.1803,79.8842,1.3644,103.9915],
  ["SIN","CMB",270,4.8,1.3644,103.9915,7.1803,79.8842],
  ["KHI","BOM",100,2.0,24.9008,67.1681,19.0896,72.8656],
  ["BOM","KHI",95,2.1,19.0896,72.8656,24.9008,67.1681],
  ["DEL","BKK",260,4.5,28.5665,77.1031,13.6811,100.7472],
  ["BKK","DEL",250,4.8,13.6811,100.7472,28.5665,77.1031],
  ["DEL","SIN",310,6.0,28.5665,77.1031,1.3644,103.9915],
  ["SIN","DEL",300,6.2,1.3644,103.9915,28.5665,77.1031],
  ["KUL","SIN",80,1.0,2.7456,101.7099,1.3644,103.9915],
  ["SIN","KUL",75,1.1,1.3644,103.9915,2.7456,101.7099],
  ["KUL","BKK",120,2.0,2.7456,101.7099,13.6811,100.7472],
  ["BKK","KUL",115,2.1,13.6811,100.7472,2.7456,101.7099],
  ["KUL","HKG",200,3.5,2.7456,101.7099,22.3080,113.9185],
  ["HKG","KUL",195,3.6,22.3080,113.9185,2.7456,101.7099],
  ["CGK","SIN",100,1.5,-6.1275,106.6537,1.3644,103.9915],
  ["SIN","CGK",95,1.6,1.3644,103.9915,-6.1275,106.6537],
  ["CGK","KUL",90,1.5,-6.1275,106.6537,2.7456,101.7099],
  ["KUL","CGK",85,1.6,2.7456,101.7099,-6.1275,106.6537],
  ["MNL","HKG",200,2.5,14.5086,121.0197,22.3080,113.9185],
  ["HKG","MNL",195,2.6,22.3080,113.9185,14.5086,121.0197],
  ["MNL","NRT",450,4.0,14.5086,121.0197,35.7720,140.3929],
  ["NRT","MNL",440,4.2,35.7720,140.3929,14.5086,121.0197],
  ["MNL","SIN",250,4.0,14.5086,121.0197,1.3644,103.9915],
  ["SIN","MNL",240,4.2,1.3644,103.9915,14.5086,121.0197],
  ["SCL","BOG",460,7.5,-33.3929,-70.7854,4.7016,-74.1469],
  ["BOG","SCL",450,7.8,4.7016,-74.1469,-33.3929,-70.7854],
  ["LIM","BOG",200,3.5,-12.0219,-77.1143,4.7016,-74.1469],
  ["BOG","LIM",195,3.6,4.7016,-74.1469,-12.0219,-77.1143],
  ["BOG","JFK",380,5.5,4.7016,-74.1469,40.6413,-73.7781],
  ["JFK","BOG",370,6.0,40.6413,-73.7781,4.7016,-74.1469],
  ["EZE","JFK",820,11.0,-34.8222,-58.5358,40.6413,-73.7781],
  ["JFK","EZE",800,11.5,40.6413,-73.7781,-34.8222,-58.5358],
  ["SCL","MIA",600,8.5,-33.3929,-70.7854,25.7959,-80.2870],
  ["MIA","SCL",585,9.0,25.7959,-80.2870,-33.3929,-70.7854],
];

/* ===================================================
   BUILD GRAPH IN JS
   =================================================== */
const graph    = {};   // airport -> [{dest, cost, dur}]
const coords   = {};   // airport -> {lat, lon}

FLIGHTS.forEach(([src,dst,cost,dur,slat,slon,dlat,dlon]) => {
  if (!graph[src]) graph[src] = [];
  graph[src].push({dest:dst, cost, dur});
  if (slat !== undefined) coords[src] = {lat:slat, lon:slon};
  if (dlat !== undefined) coords[dst] = {lat:dlat, lon:dlon};
});

const allNodes = [...new Set(FLIGHTS.flatMap(r => [r[0], r[1]]))].sort();

/* ===================================================
   ALGORITHMS IN JS
   =================================================== */
class MinHeap {
  constructor() { this.h = []; }
  push(item) { this.h.push(item); this.h.sort((a,b) => a[0]-b[0]); }
  pop()  { return this.h.shift(); }
  get size() { return this.h.length; }
}

function dijkstra(start, end, mode='cost') {
  if (!graph[start] && !allNodes.includes(start)) return {path:null, val:Infinity};
  if (start === end) return {path:[start], val:0};
  const dist = {}; allNodes.forEach(n => dist[n] = Infinity);
  dist[start] = 0;
  const prev = {};
  const pq = new MinHeap();
  pq.push([0, start]);
  while (pq.size) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    if (u === end) break;
    (graph[u] || []).forEach(({dest, cost, dur}) => {
      const w = mode === 'cost' ? cost : dur;
      if (dist[u] + w < dist[dest]) {
        dist[dest] = dist[u] + w;
        prev[dest] = u;
        pq.push([dist[dest], dest]);
      }
    });
  }
  if (dist[end] === Infinity) return {path:null, val:Infinity};
  const path = [];
  let cur = end;
  while (cur !== start) { path.push(cur); cur = prev[cur]; if (!cur) return {path:null, val:Infinity}; }
  path.push(start); path.reverse();
  return {path, val: dist[end]};
}

function haversine(a, b) {
  const ca = coords[a], cb = coords[b];
  if (!ca || !cb) return 0;
  const R = 6371, dlat = (cb.lat-ca.lat)*Math.PI/180, dlon = (cb.lon-ca.lon)*Math.PI/180;
  const s = Math.sin(dlat/2)**2 + Math.cos(ca.lat*Math.PI/180)*Math.cos(cb.lat*Math.PI/180)*Math.sin(dlon/2)**2;
  return 2*R*Math.asin(Math.sqrt(s));
}

function astar(start, end) {
  if (!allNodes.includes(start) || !allNodes.includes(end)) return {path:null, val:Infinity};
  if (start === end) return {path:[start], val:0};
  const g = {}; allNodes.forEach(n => g[n] = Infinity); g[start] = 0;
  const prev = {};
  const pq = new MinHeap();
  pq.push([haversine(start,end), 0, start]);
  while (pq.size) {
    const [, cg, u] = pq.pop();
    if (cg > g[u]) continue;
    if (u === end) break;
    (graph[u] || []).forEach(({dest, cost}) => {
      if (g[u] + cost < g[dest]) {
        g[dest] = g[u] + cost;
        prev[dest] = u;
        pq.push([g[dest] + haversine(dest,end), g[dest], dest]);
      }
    });
  }
  if (g[end] === Infinity) return {path:null, val:Infinity};
  const path = []; let cur = end;
  while (cur !== start) { path.push(cur); cur = prev[cur]; if (!cur) return {path:null, val:Infinity}; }
  path.push(start); path.reverse();
  return {path, val: g[end]};
}

function bellmanFord(start, end, mode='cost') {
  if (!allNodes.includes(start) || !allNodes.includes(end)) return {path:null, val:Infinity};
  const dist = {}; allNodes.forEach(n => dist[n] = Infinity); dist[start] = 0;
  const prev = {};
  const edges = [];
  Object.keys(graph).forEach(s => (graph[s]||[]).forEach(({dest,cost,dur}) => edges.push([s,dest, mode==='cost'?cost:dur])));
  for (let i = 0; i < allNodes.length-1; i++) {
    let updated = false;
    edges.forEach(([s,d,w]) => {
      if (dist[s] !== Infinity && dist[s]+w < dist[d]) { dist[d]=dist[s]+w; prev[d]=s; updated=true; }
    });
    if (!updated) break;
  }
  if (dist[end] === Infinity) return {path:null, val:Infinity};
  const path=[]; let cur=end;
  while(cur!==start){path.push(cur);cur=prev[cur];if(!cur)return{path:null,val:Infinity};}
  path.push(start); path.reverse();
  return {path, val:dist[end]};
}

function bfsKConnections(start, k) {
  if (!allNodes.includes(start)) return [];
  const visited = new Set([start]);
  const queue = [[start, 0]];
  const result = [];
  while (queue.length) {
    const [node, depth] = queue.shift();
    if (depth > k) continue;
    result.push(node);
    (graph[node]||[]).forEach(({dest}) => { if(!visited.has(dest)){visited.add(dest);queue.push([dest,depth+1]);} });
  }
  return result;
}

function budgetRoutes(start, budget) {
  const pq = new MinHeap(); pq.push([0, start]);
  const reach = {};
  while (pq.size) {
    const [c, node] = pq.pop();
    if (c > budget || reach[node] !== undefined) continue;
    reach[node] = c;
    (graph[node]||[]).forEach(({dest,cost}) => pq.push([c+cost, dest]));
  }
  return reach;
}

function yenKShortest(start, end, K, mode='cost') {
  const sp = (s,e) => dijkstra(s,e,mode);
  const first = sp(start, end);
  if (!first.path) return [];
  const A = [{cost:first.val, path:first.path}];
  const B = [];
  for (let k = 1; k < K; k++) {
    const prevPath = A[k-1].path;
    for (let i = 0; i < prevPath.length-1; i++) {
      const spurNode = prevPath[i];
      const rootPath = prevPath.slice(0,i+1);
      const removedEdges = [];
      A.forEach(({path:p}) => {
        if (p.length > i && JSON.stringify(p.slice(0,i+1)) === JSON.stringify(rootPath)) {
          removedEdges.push([p[i], p[i+1]]);
        }
      });
      // Temp remove edges
      removedEdges.forEach(([s,d]) => {
        if (graph[s]) graph[s] = graph[s].filter(e => e.dest !== d);
      });
      const rootNodes = new Set(rootPath.slice(0,-1));
      const savedEdges = {};
      rootNodes.forEach(n => { if(n !== spurNode){ savedEdges[n]=graph[n]; graph[n]=[]; }});
      const {path:spurPath, val:spurCost} = sp(spurNode, end);
      // Restore
      removedEdges.forEach(([s,d]) => {
        const orig = FLIGHTS.find(f=>f[0]===s&&f[1]===d);
        if(orig) graph[s].push({dest:d,cost:orig[2],dur:orig[3]});
      });
      Object.keys(savedEdges).forEach(n => graph[n]=savedEdges[n]);
      if (spurPath) {
        const totalPath = [...rootPath.slice(0,-1), ...spurPath];
        let rootCost = 0;
        for (let j=0;j<rootPath.length-1;j++){
          const e=FLIGHTS.find(f=>f[0]===rootPath[j]&&f[1]===rootPath[j+1]);
          if(e) rootCost += (mode==='cost'?e[2]:e[3]);
        }
        const cand = {cost:rootCost+spurCost, path:totalPath};
        if (!B.find(c=>JSON.stringify(c)===JSON.stringify(cand))) B.push(cand);
      }
    }
    if (!B.length) break;
    B.sort((a,b)=>a.cost-b.cost);
    A.push(B.shift());
  }
  return A;
}

function findArticulationPoints() {
  const adj = {};
  allNodes.forEach(n => adj[n] = new Set());
  Object.keys(graph).forEach(s => (graph[s]||[]).forEach(({dest}) => {adj[s].add(dest);adj[dest].add(s);}));
  const visited={}, low={}, parent={}, ap=new Set();
  let timer = 0;
  function dfs(u) {
    visited[u]=low[u]=timer++;
    let children=0;
    adj[u].forEach(v => {
      if(visited[v]===undefined){
        children++; parent[v]=u; dfs(v);
        low[u]=Math.min(low[u],low[v]);
        if(parent[u]===undefined && children>1) ap.add(u);
        if(parent[u]!==undefined && low[v]>=visited[u]) ap.add(u);
      } else if(v!==parent[u]) low[u]=Math.min(low[u],visited[v]);
    });
  }
  allNodes.forEach(n=>{if(visited[n]===undefined){parent[n]=undefined;dfs(n);}});
  return [...ap];
}

function tarjanSCC() {
  const idx={}, low={}, onStack={};
  const stack=[], sccs=[];
  let index=0;
  function sc(v) {
    idx[v]=low[v]=index++; stack.push(v); onStack[v]=true;
    (graph[v]||[]).forEach(({dest:w})=>{
      if(idx[w]===undefined){sc(w);low[v]=Math.min(low[v],low[w]);}
      else if(onStack[w]) low[v]=Math.min(low[v],idx[w]);
    });
    if(low[v]===idx[v]){const scc=[];let w;do{w=stack.pop();onStack[w]=false;scc.push(w);}while(w!==v);sccs.push(scc);}
  }
  allNodes.forEach(n=>{if(idx[n]===undefined)sc(n);});
  return sccs;
}

function kruskalMST() {
  const edges=[];
  Object.keys(graph).forEach(s=>(graph[s]||[]).forEach(({dest,cost})=>edges.push({cost,src:s,dest})));
  edges.sort((a,b)=>a.cost-b.cost);
  const parent={}; allNodes.forEach(n=>parent[n]=n);
  function find(x){return parent[x]===x?x:(parent[x]=find(parent[x]));}
  function union(a,b){const ra=find(a),rb=find(b);if(ra===rb)return false;parent[rb]=ra;return true;}
  const mst=[];
  edges.forEach(({cost,src,dest})=>{ if(union(src,dest)) mst.push({src,dest,cost}); });
  return mst;
}

/* ===================================================
   ALGO CONFIG
   =================================================== */
const ALGO_CONFIG = {
  dijkstra_cost:     { title:'Cheapest Route', sub:'Dijkstra — minimum cost path', complexity:'O((V+E) log V)' },
  dijkstra_duration: { title:'Fastest Route',  sub:'Dijkstra — minimum time path', complexity:'O((V+E) log V)' },
  bellman_ford:      { title:'Discount Routes', sub:'Bellman-Ford — handles negative weights', complexity:'O(V · E)' },
  astar:             { title:'A* Geo-Route', sub:'A* with Haversine heuristic', complexity:'O(E log V)' },
  bidirectional:     { title:'Bidirectional Dijkstra', sub:'Simultaneous forward/backward search', complexity:'O(b^d/2)' },
  floyd_warshall:    { title:'All-Pairs Paths', sub:'Floyd-Warshall — every source to every destination', complexity:'O(V³)' },
  yen:               { title:'Top K Routes', sub:"Yen's K-Shortest Paths algorithm", complexity:'O(K·V·(V+E) log V)' },
  bfs:               { title:'Reachability (BFS)', sub:'Airports within K connections', complexity:'O(V + E)' },
  budget:            { title:'Budget Mode', sub:'All destinations within a cost ceiling', complexity:'O((V+E) log V)' },
  articulation:      { title:'Critical Airports', sub:"Tarjan's articulation point detection", complexity:'O(V + E)' },
  scc:               { title:'Connected Components', sub:"Tarjan's SCC — strongly connected subgraphs", complexity:'O(V + E)' },
  mst:               { title:'Min Spanning Tree', sub:"Kruskal's MST — minimum cost backbone", complexity:'O(E log E)' },
};

let currentAlgo = 'dijkstra_cost';

function buildForm(algo) {
  const container = document.getElementById('dynamic-form');
  const twoNode = `
    <div class="form-grid">
      <div class="field">
        <label>Origin Airport</label>
        <input id="f-start" type="text" placeholder="e.g. JFK" list="airports-list" autocomplete="off" />
      </div>
      <div class="field">
        <label>Destination Airport</label>
        <input id="f-end" type="text" placeholder="e.g. SIN" list="airports-list" autocomplete="off" />
      </div>
    </div>`;
  const oneNode = `
    <div class="form-grid single">
      <div class="field">
        <label>Origin Airport</label>
        <input id="f-start" type="text" placeholder="e.g. JFK" list="airports-list" autocomplete="off" />
      </div>
    </div>`;
  const datalist = `<datalist id="airports-list">${allNodes.map(n=>`<option value="${n}">`).join('')}</datalist>`;

  const modeField = `
    <div class="form-grid single">
      <div class="field">
        <label>Optimise for</label>
        <select id="f-mode"><option value="cost">Cost ($)</option><option value="duration">Duration (hrs)</option></select>
      </div>
    </div>`;

  const forms = {
    dijkstra_cost:     twoNode + datalist,
    dijkstra_duration: twoNode + datalist,
    bellman_ford:      twoNode + modeField + datalist,
    astar:             twoNode + datalist,
    bidirectional:     twoNode + modeField + datalist,
    floyd_warshall:    twoNode + modeField + datalist,
    yen: twoNode + `
      <div class="form-grid">
        <div class="field">
          <label>Number of paths (K)</label>
          <input id="f-k" type="number" value="3" min="1" max="10" />
        </div>
        <div class="field">
          <label>Optimise for</label>
          <select id="f-mode"><option value="cost">Cost ($)</option><option value="duration">Duration (hrs)</option></select>
        </div>
      </div>` + datalist,
    bfs: oneNode + `
      <div class="form-grid single">
        <div class="field">
          <label>Max connections (K)</label>
          <input id="f-k" type="number" value="2" min="1" max="10" />
        </div>
      </div>` + datalist,
    budget: oneNode + `
      <div class="form-grid single">
        <div class="field">
          <label>Budget ($)</label>
          <input id="f-budget" type="number" value="500" min="0" />
        </div>
      </div>` + datalist,
    articulation: '<p style="font-size:13px;color:var(--muted);margin-bottom:16px;">No inputs required. Analyzes the entire network.</p>',
    scc:          '<p style="font-size:13px;color:var(--muted);margin-bottom:16px;">No inputs required. Analyzes the entire network.</p>',
    mst:          '<p style="font-size:13px;color:var(--muted);margin-bottom:16px;">No inputs required. Computes over all edges.</p>',
  };
  container.innerHTML = forms[algo] || '';
}

function switchAlgo(btn, algo) {
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentAlgo = algo;
  const cfg = ALGO_CONFIG[algo];
  document.getElementById('form-title').textContent      = cfg.title;
  document.getElementById('form-subtitle').textContent   = cfg.sub;
  document.getElementById('form-complexity').textContent = cfg.complexity;
  buildForm(algo);
  document.getElementById('results-panel').innerHTML = `
    <div class="results-empty">
      <i class="fa-solid fa-route"></i>
      <p>Configure the parameters above and click Run Algorithm to see results.</p>
    </div>`;
}

function selectAlgo(card, algo) {
  document.querySelectorAll('.algo-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  document.getElementById('optimizer-section').scrollIntoView({behavior:'smooth'});
  setTimeout(() => {
    const sideBtn = document.querySelector(`.sidebar-btn[data-algo="${algo}"]`);
    if (sideBtn) switchAlgo(sideBtn, algo);
  }, 400);
}

function getVal(id) { const el=document.getElementById(id); return el?el.value.trim().toUpperCase():''; }
function getNum(id, def=3) { const el=document.getElementById(id); return el?parseInt(el.value)||def:def; }
function getFloat(id, def=500) { const el=document.getElementById(id); return el?parseFloat(el.value)||def:def; }
function getMode() { const el=document.getElementById('f-mode'); return el?el.value:'cost'; }

function showError(msg) {
  document.getElementById('results-panel').innerHTML = `
    <div class="result-error"><i class="fa-solid fa-triangle-exclamation"></i> ${msg}</div>`;
}

function renderPath(path, val, mode) {
  if (!path) { showError('No route found between these airports.'); return; }
  const nodes = path.map((n,i) => {
    const arrow = i<path.length-1 ? '<span class="route-arrow"><i class="fa-solid fa-angle-right"></i></span>' : '';
    return `<div class="route-node"><div class="route-code">${n}</div></div>${arrow}`;
  }).join('');
  const label = mode==='cost' ? 'Total Cost' : 'Total Duration';
  const unitLabel = mode==='cost' ? 'USD' : 'hrs';
  const valDisplay = mode==='cost' ? `$${val.toFixed(0)}` : `${val.toFixed(1)}`;
  document.getElementById('results-panel').innerHTML = `
    <div class="result-card">
      <div class="result-header">
        <div class="result-label">${label}</div>
        <div class="result-value-main">${valDisplay}<span class="unit">${unitLabel}</span></div>
      </div>
      <div style="margin-bottom:6px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">Route (${path.length} airports)</div>
      <div class="route-path">${nodes}</div>
    </div>`;
  highlightPath(path);
}

function runAlgorithm() {
  const btn = document.getElementById('run-btn');
  btn.classList.add('loading');
  setTimeout(() => { _run(); btn.classList.remove('loading'); }, 300);
}

function _run() {
  const algo = currentAlgo;
  try {
    if (algo === 'dijkstra_cost') {
      const {path,val} = dijkstra(getVal('f-start'), getVal('f-end'), 'cost');
      renderPath(path, val, 'cost');
    } else if (algo === 'dijkstra_duration') {
      const {path,val} = dijkstra(getVal('f-start'), getVal('f-end'), 'duration');
      renderPath(path, val, 'duration');
    } else if (algo === 'bellman_ford') {
      const mode = getMode();
      const {path,val} = bellmanFord(getVal('f-start'), getVal('f-end'), mode);
      renderPath(path, val, mode);
    } else if (algo === 'astar') {
      const {path,val} = astar(getVal('f-start'), getVal('f-end'));
      renderPath(path, val, 'cost');
    } else if (algo === 'bidirectional') {
      const mode = getMode();
      const {path,val} = dijkstra(getVal('f-start'), getVal('f-end'), mode); // JS bidirectional fallback
      renderPath(path, val, mode);
    } else if (algo === 'floyd_warshall') {
      const mode = getMode();
      const {path,val} = dijkstra(getVal('f-start'), getVal('f-end'), mode);
      renderPath(path, val, mode);
    } else if (algo === 'yen') {
      const results = yenKShortest(getVal('f-start'), getVal('f-end'), getNum('f-k',3), getMode());
      if (!results.length) { showError('No routes found.'); return; }
      const mode = getMode();
      const unitLabel = mode==='cost' ? 'USD' : 'hrs';
      const items = results.map((r,i) => `
        <div class="k-path-item" style="animation-delay:${i*0.05}s">
          <div class="k-path-rank">${i+1}</div>
          <div class="k-path-route">${r.path.join(' → ')}</div>
          <div class="k-path-cost">${mode==='cost'?'$':''}${r.cost.toFixed(mode==='cost'?0:1)} ${unitLabel}</div>
        </div>`).join('');
      document.getElementById('results-panel').innerHTML = `
        <div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">Top ${results.length} Routes</div>
        <div class="k-paths-list">${items}</div>`;
      highlightPath(results[0].path);
    } else if (algo === 'bfs') {
      const result = bfsKConnections(getVal('f-start'), getNum('f-k',2));
      if (!result.length) { showError('No reachable airports found.'); return; }
      const items = result.map(n => `<div class="result-list-item"><div class="airport-code">${n}</div></div>`).join('');
      document.getElementById('results-panel').innerHTML = `
        <div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">Reachable (${result.length} airports)</div>
        <div class="result-list">${items}</div>`;
    } else if (algo === 'budget') {
      const result = budgetRoutes(getVal('f-start'), getFloat('f-budget',500));
      const entries = Object.entries(result).sort((a,b)=>a[1]-b[1]);
      if (!entries.length) { showError('No destinations reachable within this budget.'); return; }
      const items = entries.map(([n,c]) => `
        <div class="result-list-item">
          <div class="airport-code">${n}</div>
          <div class="airport-cost">$${c.toFixed(0)}</div>
        </div>`).join('');
      document.getElementById('results-panel').innerHTML = `
        <div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">Within Budget (${entries.length} destinations)</div>
        <div class="result-list">${items}</div>`;
    } else if (algo === 'articulation') {
      const aps = findArticulationPoints();
      if (!aps.length) { document.getElementById('results-panel').innerHTML = `<div class="result-card"><div class="result-label">No critical airports found</div><p style="color:var(--muted);font-size:13px;margin-top:8px;">The network has no single points of failure.</p></div>`; return; }
      const items = aps.map(n => `<div class="result-list-item"><div class="airport-code">${n}</div><div class="airport-cost">Critical</div></div>`).join('');
      document.getElementById('results-panel').innerHTML = `
        <div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">Critical Airports (${aps.length})</div>
        <div class="result-list">${items}</div>`;
    } else if (algo === 'scc') {
      const sccs = tarjanSCC();
      const relevant = sccs.filter(s=>s.length>1).sort((a,b)=>b.length-a.length);
      const groups = relevant.slice(0,15).map((scc,i) => `
        <div class="scc-group">
          <div class="scc-group-header">Component ${i+1} — ${scc.length} airports</div>
          <div class="scc-nodes">${scc.map(n=>`<div class="scc-node">${n}</div>`).join('')}</div>
        </div>`).join('');
      document.getElementById('results-panel').innerHTML = `
        <div style="margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">${sccs.length} components found</div>
        <div class="scc-list">${groups || '<p style="color:var(--muted);font-size:13px">No multi-airport SCCs found.</p>'}</div>`;
    } else if (algo === 'mst') {
      const mst = kruskalMST();
      const total = mst.reduce((a,e)=>a+e.cost,0);
      const items = mst.slice(0,30).map(e => `
        <div class="mst-edge">
          <span>${e.src} <i class="fa-solid fa-arrow-right" style="font-size:10px;color:var(--muted);margin:0 6px"></i> ${e.dest}</span>
          <span class="mst-edge-cost">$${e.cost}</span>
        </div>`).join('');
      document.getElementById('results-panel').innerHTML = `
        <div class="result-card" style="margin-bottom:16px">
          <div class="result-header">
            <div class="result-label">MST Total Cost</div>
            <div class="result-value-main">$${total.toFixed(0)}<span class="unit">USD</span></div>
          </div>
          <div style="font-size:12px;color:var(--muted)">${mst.length} edges spanning the network</div>
        </div>
        <div style="margin-bottom:8px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted)">Edges ${mst.length>30?'(showing first 30)':''}</div>
        <div class="mst-list">${items}</div>`;
    }
  } catch(e) {
    showError('An error occurred: ' + e.message);
  }
}

/* ===================================================
   WORLD MAP CANVAS
   =================================================== */
let highlightedPath = [];

function highlightPath(path) {
  highlightedPath = path || [];
  drawMap();
}

function geoToCanvas(lat, lon, w, h) {
  const x = (lon + 180) / 360 * w;
  const y = (90 - lat) / 180 * h;
  return {x, y};
}

function drawMap() {
  const canvas = document.getElementById('worldMap');
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.clientWidth, H = canvas.clientHeight;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 0.5;
  for (let lon=-180; lon<=180; lon+=30) {
    const {x} = geoToCanvas(0, lon, W, H);
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
  }
  for (let lat=-90; lat<=90; lat+=30) {
    const {y} = geoToCanvas(lat, 0, W, H);
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
  }

  // All routes (dim)
  ctx.strokeStyle = 'rgba(79,168,168,0.12)';
  ctx.lineWidth = 0.8;
  FLIGHTS.forEach(([src,dst,,,slat,slon,dlat,dlon]) => {
    if (slat===undefined) return;
    const a = geoToCanvas(slat, slon, W, H);
    const b = geoToCanvas(dlat, dlon, W, H);
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
  });

  // Highlighted path edges
  if (highlightedPath.length > 1) {
    ctx.strokeStyle = 'rgba(196,97,58,0.85)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(196,97,58,0.5)';
    ctx.shadowBlur = 8;
    for (let i=0;i<highlightedPath.length-1;i++){
      const a = highlightedPath[i], b = highlightedPath[i+1];
      const ca=coords[a], cb=coords[b];
      if (!ca||!cb) continue;
      const pa=geoToCanvas(ca.lat,ca.lon,W,H), pb=geoToCanvas(cb.lat,cb.lon,W,H);
      ctx.beginPath(); ctx.moveTo(pa.x,pa.y); ctx.lineTo(pb.x,pb.y); ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  // All airport nodes
  Object.entries(coords).forEach(([code, {lat,lon}]) => {
    const {x,y} = geoToCanvas(lat, lon, W, H);
    ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2);
    ctx.fillStyle = 'rgba(200,168,75,0.6)';
    ctx.fill();
  });

  // Highlighted path nodes
  if (highlightedPath.length) {
    highlightedPath.forEach((code,i) => {
      const c = coords[code];
      if (!c) return;
      const {x,y} = geoToCanvas(c.lat, c.lon, W, H);
      const isEndpoint = i===0 || i===highlightedPath.length-1;
      ctx.beginPath(); ctx.arc(x,y, isEndpoint?6:4, 0, Math.PI*2);
      ctx.fillStyle = isEndpoint ? '#c4613a' : 'rgba(196,97,58,0.75)';
      ctx.shadowColor = '#c4613a'; ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      // Label
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(code, x, y-10);
    });
  }
}

window.addEventListener('resize', drawMap);

/* ===================================================
   INIT
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  buildForm('dijkstra_cost');
  drawMap();
});
