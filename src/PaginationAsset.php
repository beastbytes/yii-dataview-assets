<?php
/**
 * @copyright Copyright © 2025 BeastBytes - All rights reserved
 * @license BSD 3-Clause
 */

declare(strict_types=1);

namespace BeastBytes\Yii\Dataview\Assets;

use Yiisoft\Assets\AssetBundle;

class PaginationAsset extends AssetBundle
{
    public ?string $basePath = '@assets';
    public ?string $baseUrl = '@assetsUrl';
    public array $js = [
        'js/pagination.js',
    ];
    public ?string $sourcePath = __DIR__ . '/../../resources/assets';
}
