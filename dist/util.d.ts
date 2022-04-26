import TimeAgo from "javascript-time-ago";
export declare const timeAgo: TimeAgo;
export declare function getConfig(): {
    serverAddress: string;
    token: string;
};
export declare function calculateDuration(durationInMs: number): string;
