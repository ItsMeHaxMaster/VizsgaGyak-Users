# Copilot Instructions

## Project Guidelines
- User reported: search not working (diagnosis: Console.Read usage). The search was broken due to using Console.Read instead of Console.ReadLine. Use Console.ReadLine for proper functionality.

- User reported: high memory usage when too many items are in the favorites list (diagnosis: ToString usage in loops). If ToString is used in a loop over many items, it can cause high memory usage. Optimize the code to reduce memory footprint.