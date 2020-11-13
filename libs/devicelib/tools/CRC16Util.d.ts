export declare class CRC16Util {
    private static crc16_tab_h;
    private static crc16_tab_l;
    /**
     * 计算CRC16校验
     *
     * @param data   需要计算的数组
     * @param offset 起始位置
     * @param len    长度
     * @param preval 之前的校验值
     * @return CRC16校验值
     */
    static calcCrc16(data: number[], offset: number, len: number, preval?: number): number;
    /**
     * 将计算的CRC值 转换为加空格的  比如  ： crc值为 A30A -> A3 0A
     *
     * @param res
     * @return
     */
    static getCrc(res: number, bigEndian?: boolean): string;
}
