// Sources from https://downlinkapp.com/sources.json

export interface ImageSource {
  name: ImageSourceNames;
  spacecraft: string;
  interval: number;
  aspect: number;
  url: {
    tiny: string;
    small: string;
    large: string;
    full: string;
  }
};

export enum ImageSourceNames {
  GoesEastFullDisk = "GOES-East Full Disk",
  GoesWestFullDisk = "GOES-West Full Disk",
  Himawari8FullDisk = "Himawari-8 Full Disk",
}

export const imageSources: Record<ImageSourceNames, ImageSource> = {
  [ImageSourceNames.GoesEastFullDisk]: {
    "name": ImageSourceNames.GoesEastFullDisk,
    "spacecraft": "GOES-East",
    "interval": 900,
    "aspect": 1,
    "url": {
      "tiny": "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/thumbnail.jpg",
      "small": "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/678x678.jpg",
      "large": "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/5424x5424.jpg",
      "full": "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/latest.jpg"
    }
  },
  [ImageSourceNames.GoesWestFullDisk]: {
    "name": ImageSourceNames.GoesWestFullDisk,
    "spacecraft": "GOES-West",
    "interval": 900,
    "aspect": 1,
    "url": {
      "tiny": "https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/thumbnail.jpg",
      "small": "https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/678x678.jpg",
      "large": "https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/5424x5424.jpg",
      "full": "https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/latest.jpg"
    }
  },
  [ImageSourceNames.Himawari8FullDisk]: {
    "name": ImageSourceNames.Himawari8FullDisk,
    "spacecraft": "Himawari-8",
    "interval": 900,
    "aspect": 1,
    "url": {
      "tiny": "http://rammb.cira.colostate.edu/ramsdis/online/images/thumb/himawari-8/full_disk_ahi_true_color.jpg",
      // The real "small" Himawari-8 image is unreliable for some reason; use the tiny version instead
      "small": "http://rammb.cira.colostate.edu/ramsdis/online/images/thumb/himawari-8/full_disk_ahi_true_color.jpg",
      // "small": "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_true_color.jpg",
      "large": "http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg",
      "full": "http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg"
    }
  },
}
