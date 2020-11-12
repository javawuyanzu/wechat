export declare class Endian {
    /**
     * 0 大端模式
     * 1 小段模式
     * 2 混合模式
     * Endian
     * 0   大端模式
     * 整数
     * A B 0 大端模式
     * B A 1 小端模式
     * 浮点数/长整数
     * A B C D 0大端模式
     * D C B A 1小段模式
     * C D A B 2混合模式
     *
     */
    static readonly Big = 0;
    static readonly Little = 1;
    static readonly Mixins = 2;
    static Info(): string[][];
    static HandleBytes(endianType: number, ...bytes: number[]): number;
}
