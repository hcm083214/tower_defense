import { resources, sp } from 'cc';

export class CharacterResourceManage {

    private static skeletonCache: Map<string, sp.SkeletonData> = new Map();

    // 预加载骨骼资源
    public static preloadSkeletons(paths: string[]): Promise<void[]> {
        const promises: Promise<void>[] = [];

        for (const path of paths) {
            if (!this.skeletonCache.has(path)) {
                promises.push(this.loadSkeleton(path));
            }
        }

        return Promise.all(promises);
    }

    // 加载单个骨骼资源
    private static loadSkeleton(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            resources.load(path, sp.SkeletonData, (err, skeletonData) => {
                if (err) {
                    console.error(`Failed to load skeleton: ${path}`, err);
                    reject(err);
                } else {
                    this.skeletonCache.set(path, skeletonData);
                    resolve();
                }
            });
        });
    }

    // 获取已缓存的骨骼资源
    public static getSkeleton(path: string): sp.SkeletonData | undefined {
        return this.skeletonCache.get(path);
    }

    // 清理缓存
    public static clearCache(): void {
        this.skeletonCache.clear();
    }
}


