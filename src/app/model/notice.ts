/**
 * Created by wstidolph on 10/2/16.
 */
export class Notice {

  constructor(
    /**
     * User who sent this notice
     */
    public noticeUid: string,
    /**
     * ISO 8609 dataetime of the observation
     */
    public seenWhen: string,
    /**
     * user decsription of location e.g., "at home"
     */
    public location?:string,
    /**
     * Open Location Code of the observation
     */
    public olc?:string,
    /**
     * User generated short string describing the observation
     */
    public description?: string,
    /**
     * if seen on-line, this is the URL as "where"
     */
    public url?: string,
    /**
     * array of tag strings
     */
    public tags?: string[],
    /**
     * uploaded image(s) of the observation
     */
    public imageUrls?:string[],
    /**
     * uploaded video(s) of the observation
     */
    public videoUrls?: string[],
    /**
     * user-generated audio
     */
    public audioClipUrl?: string,
    /**
     * user generated long description text
     */
    public longDescription?: string
  ){}
}
