
/**
 * 取得したDataStringを何分前という方に計算する関数
 * 
 * @returns string
 */
export function useDate() {
    function getTime(dateString: string): string {

        const date = new Date(dateString!);
        const now = new Date();

        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return `${diff}s`;

        const diffMin = Math.floor(diff / 60);
        if (diffMin < 60) return `${diffMin}m`;

        const diffHour = Math.floor(diffMin / 60);
        if (diffHour < 24) return `${diffHour}h`;

        const diffDay = Math.floor(diffHour / 24);
        if (diffDay < 7) return `${diffDay}d`;

        const diffWeek = Math.floor(diffDay / 7);
        if (diffWeek < 4) return `${diffWeek}week`;

        const diffMonth = Math.floor(diffDay / 30);
        if (diffMonth < 12) return `${diffMonth}month`;

        const diffYear = Math.floor(diffDay / 365);
        return `${diffYear}year`;
    }

    return { getTime }
}