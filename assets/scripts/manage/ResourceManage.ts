import { Asset, resources, sp } from 'cc';
import Singleton from './Singleton';

export class ResourceManage extends Singleton {

    static get instance() {
        return super.getInstance<ResourceManage>();
    }

    private _dirResources: Map<string, Asset[]> = new Map();
    private _resources: Map<string, Asset> = new Map();

    /**
     * @description: 加载单个资源
     * @param {string} path
     * @param {new} type
     * @return {*}
     */
    public loadResources<T extends Asset>(path: string, type?: null | (new () => T)): Promise<T> {
        if (this._resources.has(path)) {
            const cachedResource = this._resources.get(path) as T;
            return Promise.resolve(cachedResource);
        }

        return new Promise<T>((resolve, reject) => {
            if (type === undefined || type === null) {
                // 当没有指定类型时，让引擎自动推断类型
                resources.load<T>(path, (err, resource) => {
                    if (err) {
                        console.error(`Failed to load resource: ${path}`, err);
                        reject(err);
                    } else {
                        this._resources.set(path, resource);
                        resolve(resource);
                    }
                });
            } else {
                resources.load<T>(path, type, (err, resource) => {
                    if (err) {
                        console.error(`Failed to load resource: ${path}`, err);
                        reject(err);
                    } else {
                        this._resources.set(path, resource);
                        resolve(resource);
                    }
                });
            }
        });
    }

    /**
     * 加载目录下所有资源
     */
    public loadDirResources<T extends Asset>(path: string, type?: null | (new () => T)): Promise<T[]> {
        if (this._dirResources.has(path)) {
            return Promise.resolve(this._dirResources.get(path) as T[]);
        }

        return new Promise<T[]>((resolve, reject) => {
            if (type === undefined || type === null) {
                // 当没有指定类型时，让引擎自动推断类型
                resources.loadDir<T>(path, (err, resourcesList) => {
                    if (err) {
                        console.error(`Failed to load resource: ${path}`, err);
                        reject(err);
                    } else {
                        console.log("🚀 ~ ResourceManage1 ~ loadDirResources ~ resourcesList:", resourcesList.length)

                        this._dirResources.set(path, resourcesList);
                        resolve(resourcesList);
                    }
                });
            } else {
                resources.loadDir<T>(path, type, (err, resourcesList) => {
                    if (err) {
                        console.error(`Failed to load resource: ${path}`, err);
                        reject(err);
                    } else {
                        console.log("🚀 ~ ResourceManage2 ~ loadDirResources ~ resourcesList:", resourcesList.length)

                        this._dirResources.set(path, resourcesList);
                        resolve(resourcesList);
                    }
                });
            }
        });
    }

    /**
     * 获取已加载的目录资源
     */
    getDirResources<T extends Asset>(path: string): T[] {
        return this._dirResources.get(path) as T[];
    }

    /**
     * 根据名称获取目录中的资源
     */
    getDirResourceByName<T extends Asset>(dirPath: string, name: string): T | null {
        const resources = this._dirResources.get(dirPath);
        if (resources) {
            for (const res of resources) {
                if (res.name === name) {
                    return res as T;
                }
            }
        }
        return null;
    }

    /**
     * 获取已加载的资源
     */
    getResource<T extends Asset>(path: string): T | undefined {
        return this._resources.get(path) as T;
    }

    /**
     * 检查资源是否已加载
     */
    public hasResource(path: string): boolean {
        return this._resources.has(path);
    }

    /**
     * 检查目录资源是否已加载
     */
    public hasDirResource(path: string): boolean {
        return this._dirResources.has(path);
    }

    /**
     * 释放指定资源
     */
    public releaseResource(path: string): void {
        if (this._resources.has(path)) {
            this._resources.delete(path);
        }
    }

    /**
     * 释放目录资源
     */
    public releaseDirResource(path: string): void {
        if (this._dirResources.has(path)) {
            this._dirResources.delete(path);
        }
    }

    /**
     * 释放所有资源
     */
    public releaseAll(): void {
        this._resources.clear();
        this._dirResources.clear();
    }
}


