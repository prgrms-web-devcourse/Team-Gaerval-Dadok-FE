export interface APIDefaultBook {
  bookId: number;
  title: string;
  imageUrl: string;
}

export interface APISubBook {
  author: string;
  isbn: string;
  url: string;
  publisher: string;
}

export interface APIRecommendedBook extends APIDefaultBook, APISubBook {
  jobGroup: string;
  jobName: string;
  count: number;
}

export interface APIBook extends APIDefaultBook, APISubBook {
  contents: string;
}

export interface APIBookInfo extends APIDefaultBook, APISubBook {
  contents: string;
  apiProvider: string;
  imageKey: string;
}

export interface APICreateBookCommentRequest {
  comment: string;
}
