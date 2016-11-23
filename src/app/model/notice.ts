/**
 * Created by wstidolph on 10/2/16.
 */
export interface Notice {

    /**
     * The key to the Watch
     */
    watchKey: string;
    /**
     * User who sent this notice
     */
    noticeUid?: string;
    /**
     * ISO 8609 dataetime of the observation
     */
    seenWhen?: string;
    /**
     * user decsription of location e.g., "at home"
     */
    location?:string;
    /**
     * Open Location Code of the observation
     */
    olc?:string;
    /**
     * User generated short string describing the observation
     */
    description?: string;
    /**
     * if seen on-line, this is the URL as "where"
     */
    url?: string;
    /**
     * array of tag strings
     */
    tags?: string[];
    /**
     * uploaded image(s) of the observation
     */
    imageUrls?:string[];
    /**
     * uploaded video(s) of the observation
     */
    videoUrls?: string[],
    /**
     * user-generated audio
     */
    audioClipUrl?: string;
    /**
     * user generated long description text
     */
    longDescription?: string;
}
