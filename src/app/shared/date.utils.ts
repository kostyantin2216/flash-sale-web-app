
export class DateUtils {

    public static normalizeTime = (time: string): string => (time.length === 1) ? time.padStart(2, '0') : time;

}
