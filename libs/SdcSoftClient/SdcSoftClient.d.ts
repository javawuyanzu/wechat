/// <reference types="node" />
export declare class SdcSoftClient {
    static readonly Connection_Status_Closed = 0;
    static readonly Connection_Status_Opened = 1;
    private client;
    private msgListenerMap;
    private errCallBack;
    set OnError(fn: (err: any) => void);
    private connectCallBack;
    set OnConnect(fn: (pt: any) => void);
    private offlineCallBack;
    set OnOffine(fn: (connection: any) => void);
    private closeCallBack;
    set OnClose(fn: (connection: any) => void);
    private msgCallBack;
    options: {
        keepalive: number;
        clientId: string;
        protocolId: string;
        protocolVersion: number;
        clean: boolean;
        reconnectPeriod: number;
        connectTimeout: number;
        username: string;
        password: string;
        rejectUnauthorized: boolean;
    };
    private mqtt;
    path: string;
    constructor(mqtt: any, url: string, port: string, username: string, password: string, openId: string);
    Connect(): void;
    Close(): void;
    private initMessageListener;
    private deInitMessageListener;
    addMessageListener(deviceNo: string | null, fn: (topic: string, payload: Buffer, packet: any) => void, prefix?: string): Promise<unknown>;
    removeMessageListener(deviceNo: string | null, prefix?: string): Promise<unknown>;
}
