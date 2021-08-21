#!/bin/bash
# Since the v2 branch use different framework with v1, we need to create 2 projects to deploy them.
if [[ "$ENABLE_BUILD_V2" == "true" ]]; then
    # Proceed with the build
    echo "✅ - Build can proceed";
    next build

else
    # Don't build
    echo "🛑 - Build cancelled";
    exit 0;
fi
