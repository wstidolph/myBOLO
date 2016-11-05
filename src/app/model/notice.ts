/**
 * Created by wstidolph on 10/2/16.
 */
export class Notice {

  constructor(
    public $key:string,
    public watchKey: string,
    public location?:string,
    public olc?:string,
    public description?: string,
    public url?: string,
    public tags?: string[],
    public imageUrl?:string,
    public videoUrl?: string,
    public longDescription?: string
  ){}
}
