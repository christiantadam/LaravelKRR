<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RegexIterator;
use Illuminate\Support\Facades\File;

class ListDBConnections extends Command
{
    protected $signature = 'list:db-connections {connectionName?}';
    protected $description = 'List and group DB::connection usages along with their queries in all controllers. Optionally filter by connection name.';

    public function handle()
    {
        $connectionNameFilter = $this->argument('connectionName');
        $controllersPath = app_path('Http/Controllers');
        $connections = [];

        // Recursively scan all controller files
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($controllersPath));
        $phpFiles = new RegexIterator($files, '/\.php$/');

        foreach ($phpFiles as $file) {
            $content = File::get($file);
            $matches = [];

            // Match DB::connection('connection_name')->select(...)
            preg_match_all(
                "/DB::connection\(['\"](.*?)['\"]\)->select\((.*?)\);/s",
                $content,
                $matches,
                PREG_SET_ORDER
            );

            if (!empty($matches)) {
                foreach ($matches as $match) {
                    $connectionName = $match[1];
                    $query = $match[2];
                    $filePath = str_replace(base_path(), '', $file);

                    // Filter by connection name if provided
                    if ($connectionNameFilter && $connectionName !== $connectionNameFilter) {
                        continue;
                    }

                    $connections[$connectionName][] = [
                        'file' => $filePath,
                        'query' => trim($query)
                    ];
                }
            }
        }

        if (empty($connections)) {
            $this->info("No DB::connection()->select() usage found for the specified connection.");
            return;
        }

        // Display grouped connections and queries
        foreach ($connections as $connectionName => $usages) {
            $this->info("Connection: $connectionName");
            foreach ($usages as $usage) {
                $this->line("  File: " . $usage['file']);
                $this->line("  Query: " . $usage['query']);
                $this->line(''); // Empty line for better readability
            }
        }
    }
}
